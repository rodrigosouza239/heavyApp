/* eslint-disable react/prop-types */
import color from 'color';
import moment from 'moment';
import { Platform, View, ActivityIndicator, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import useTranslation from '@i18n/';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';

import io from 'socket.io-client';
import Echo from 'laravel-echo';
import Box from '@components/Box';
import { useTheme } from '@theme/';
import { safeRender } from '@utils/';
import Typography from '@components/Typography';

import { useDispatch, useSelector } from 'react-redux';

import Icon from '@components/Icon';
import {
  getHistory,
  getVehicle,
  vehicleReset,
  sendChat,
  getInitialNotifications,
  updateBuyerLastMessage,
} from './ducks';

function ChatScreen({ route }) {
  const $t = useTranslation();
  const dispatch = useDispatch();
  const {
    history,
    historyLoading,
    historyError,
    vehicle,
    vehicleLoading,
    vehicleError,
    saleVehicle,
  } = useSelector((state) => state.business);
  const { user: userData } = useSelector((state) => state.auth);

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userUpdate, setUserUpdate] = useState(null);
  const [firstMessage, setFirstMessage] = useState(false);

  let socketContext = null;

  const socketCon = () => {
    const token = global?.store?.getState()?.auth?.user?.token;
    const echo = new Echo({
      host: 'https://api.heavymotors.luby.com.br:9876',
      broadcaster: 'socket.io',
      client: io,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    setSocket(echo);
    socketContext = echo;
  };

  const receivedMessage = (data) => {
    dispatch(getInitialNotifications());
    if (route.params.user) {
      const index = saleVehicle?.findIndex((e) => e.id === data?.user?.id);
      if (index !== -1) {
        saleVehicle[index].last_event.event.text = data.event.text;
        saleVehicle[index].last_event.created_at = moment(data?.created_at).format(
          'YYYY-MM-DD HH:mm:ss',
        );
      }
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          received: true,
          text: data?.event?.text,
          user: { _id: data?.user?.email },
          _id: previousMessages.length - 1 + 1,
          createdAt: data?.created_at
            ? moment(data.created_at, 'YYYY-MM-DD HH:mm:ss').toDate()
            : moment().toDate(),
        },
      ]),
    );
  };

  function putChat() {
    try {
      setMessages(
        history.reverse()?.map((message, index) => ({
          ...message,
          _id: index,
          received: true,
          text: message.event.text,
          user: { _id: message.user.email },
          createdAt: moment(message.created_at, 'YYYY-MM-DD HH:mm:ss').toDate(),
        })) || [],
      );
      dispatch(getInitialNotifications());
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar chat.');
    }
  }

  function rundSendChatEvent(messageTo) {
    let dataTo = { id: 0, email: '', secure_id: '0' };

    if (!userUpdate)
      dataTo = {
        id: vehicle?.user?.id,
        email: vehicle?.user?.email,
        secure_id: vehicle?.user?.secure_id,
      };
    else {
      dataTo = {
        id: userUpdate?.id,
        email: userUpdate?.email,
        secure_id: userUpdate?.secure_id,
      };
    }

    if (firstMessage) {
      dispatch(
        sendChat({
          vehicle_id: vehicle?.id,
          to: dataTo,
          event: {
            text: messageTo?.text,
            type: 'message-text',
          },
          createdAt: messageTo?.createdAt,
        }),
      );
      setFirstMessage(false);
    } else
      dispatch(
        sendChat({
          vehicle_id: vehicle?.id,
          to: dataTo,
          user: {
            id: userData?.id,
            email: userData?.email,
            secure_id: userData?.secure_id,
          },
          event: {
            text: messageTo?.text,
            type: 'message-text',
          },
          createdAt: messageTo?.createdAt,
        }),
      );

    dispatch(getInitialNotifications());
  }

  const handleSend = (message) => {
    rundSendChatEvent(message[0]);
  };

  useEffect(() => {
    if (route?.params?.item) {
      dispatch(getVehicle(route?.params?.item?.vehicle_id));
      setFirstMessage(!!route?.params?.item?.firstMessage);
    } else if (route?.params?.user) {
      setUserUpdate(route?.params?.user);
    }

    socketCon();
    return () => {
      // dispatch(vehicleReset());
      if (socketContext) {
        Object.keys(socketContext?.connector?.channels)?.map((item) => socketContext?.leave(item));
      }
    };
  }, []);

  useEffect(() => {
    if (route?.params?.user) {
      dispatch(
        getHistory({
          vehicle_id: vehicle?.id,
          to: {
            id: route?.params?.user?.id,
            to: route?.params?.user?.email,
            secure_id: route?.params?.user?.secure_id,
          },
        }),
      );
    } else if (vehicle) {
      if (route?.params?.item) {
        dispatch(
          getHistory({
            vehicle_id: vehicle?.id,
            to: {
              id: vehicle?.user?.id,
              to: vehicle?.user?.email,
              secure_id: vehicle?.user?.secure_id,
            },
          }),
        );
      }
    }
  }, [vehicle]);

  useEffect(() => {
    if (history) {
      putChat();
    }
  }, [history]);

  useEffect(() => {
    if (socket) {
      const vehicleId = vehicle?.id;
      if (userUpdate) {
        const [senderId, receiverId] = [userData?.secure_id, userUpdate?.secure_id].sort();
        const newChannelName = `chat.${senderId}|${receiverId}|${vehicleId}`;
        socket.join(newChannelName).listen('.ChatSendEvent', (e) => receivedMessage(e));
      } else if (vehicle?.user !== undefined) {
        const [senderId, receiverId] = [userData?.secure_id, vehicle?.user?.secure_id].sort();
        const newChannelName = `chat.${senderId}|${receiverId}|${vehicleId}`;
        socket.join(newChannelName).listen('.ChatSendEvent', (e) => receivedMessage(e));
      }
    }
  }, [socket, vehicle, userUpdate]);

  const {
    palette: {
      action,
      common: { white },
      divider,
      primary,
      text,
    },
    spacing,
    typography: {
      body1,
      button,
      fonts: {
        regular: { fontFamily },
      },
    },
  } = useTheme();

  const borderRadius = spacing(2);

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        label="Enviar"
        sendButtonProps={{ activeOpacity: button.activeOpacity }}
        textStyle={{ ...button, color: primary.main }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: 50,
          }}
        >
          <Icon name="paper-plane" size={30} />
        </View>
      </Send>
    );
  };

  const shadowStyles = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  };

  const fontStyles = {
    ...body1,
    color: text.secondary,
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            ...fontStyles,
          },
          left: {
            ...fontStyles,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: white,
            borderRadius: 0,
            borderBottomRightRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            borderTopLeftRadius: borderRadius,
            ...shadowStyles,
            marginLeft: -45,
          },
          right: {
            backgroundColor: color(divider).alpha(0.08).rgb().toString(),
            borderRadius: 0,
            borderTopRightRadius: borderRadius,
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            ...shadowStyles,
          },
        }}
      />
    );
  };

  const renderTime = (item) => {
    const {
      currentMessage: { createdAt },
    } = item;

    const time = moment(createdAt);
    const timeFormatted = time.isValid() ? time.format('HH:mm') : '';

    return safeRender(
      timeFormatted,
      <Box p={0.5}>
        <Typography variant="caption">{timeFormatted}</Typography>
      </Box>,
    );
  };

  const tickStyles = {
    color: text.primary,
  };

  const textInputProps = {
    placeholderTextColor: action.disabled,
    style: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      fontFamily,
      marginTop: Platform.select({
        ios: 6,
        android: 0,
      }),
      marginBottom: Platform.select({
        ios: 5,
        android: 3,
      }),
      minHeight: Platform.select({
        ios: 33,
        android: 41,
      }),
    },
  };

  const imageStyles = {
    width: 90,
    height: 90,
    borderRadius,
    overflow: 'hidden',
  };

  const textStyles = { fontFamily, color: text.primary };

  if (vehicleLoading || historyLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color={primary} />
      </View>
    );

  if (vehicleError || historyError)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography>{$t('unexpectedErrorTryAgain')}</Typography>
      </View>
    );

  // eslint-disable-next-line consistent-return
  const getImage = () => {
    if (vehicle) {
      const images = Object.keys(vehicle?.vehicle_image);
      return vehicle?.vehicle_image[images[0]]?.image?.medium;
    }
  };

  return (
    <>
      <Box p={2} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box mr={1} style={{ flex: 1 }}>
          <Typography variant="h1" color="textSecondary" style={{ flexWrap: 'wrap' }}>
            {vehicle ? `${vehicle?.brand?.description} ${vehicle?.model?.description}` : ''}
          </Typography>
          <Typography variant="h6" color="textSecondary" style={{ flexWrap: 'wrap' }}>
            {route?.params?.user ? userUpdate?.name : vehicle?.user?.name}
          </Typography>
        </Box>
        <View style={imageStyles}>
          <Image
            style={imageStyles}
            resizeMode="cover"
            source={{ uri: vehicle ? getImage() : undefined || undefined }}
          />
        </View>
      </Box>
      <GiftedChat
        isTyping
        scrollToBottom
        dateFormat="DD/MM/YYYY"
        maxInputLength={500}
        messages={messages}
        onSend={handleSend}
        alwaysShowSend={false}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderTime={renderTime}
        renderUsernameOnMessage={false}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        textInputProps={textInputProps}
        textStyle={textStyles}
        tickStyle={tickStyles}
        placeholder={$t('typeMessage')}
        user={{
          _id: userData?.email,
        }}
      />
    </>
  );
}

export default ChatScreen;
