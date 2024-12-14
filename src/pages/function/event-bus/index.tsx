import { useEmit, useOn } from '@sa/hooks';

const { Text, Title } = ATypography;

// Sender 组件：负责发送消息
function Sender() {
  const emit = useEmit();
  const sendMessage = () => {
    emit('message', 'Hello from Sender!', new Date().toLocaleTimeString());
  };

  return (
    <ACard
      className="shadow-sm transition-shadow duration-300 hover:shadow-md"
      title={
        <ASpace>
          <IconAntDesignSendOutlined className="text-blue-500" />
          <Text strong>Sender Component</Text>
        </ASpace>
      }
    >
      <AButton
        className="w-full"
        icon={<IconAntDesignSendOutlined />}
        size="large"
        type="primary"
        onClick={sendMessage}
      >
        Send Message
      </AButton>
    </ACard>
  );
}

// Receiver 组件：负责接收消息
function Receiver() {
  const [message, setMessage] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useOn('message', (msg: string, timestamp: string) => {
    setMessage(msg);
    setTime(timestamp);
  });

  const MessageDisplay = () => (
    <ASpace
      className="w-full"
      direction="vertical"
    >
      <div className="rounded-lg">
        <Text type="secondary">Message:</Text>
        <Text
          strong
          className="block"
        >
          {message}
        </Text>
        <ADivider className="my-2" />
        <Text type="secondary">Received at:</Text>
        <Text className="block">{time}</Text>
      </div>
    </ASpace>
  );

  const EmptyMessage = () => (
    <div className="py-4 text-center text-gray-400">
      <div className="mb-2 text-2xl">
        <IconAntDesignInboxOutlined />
      </div>
      <Text type="secondary">No message received.</Text>
    </div>
  );

  return (
    <ACard
      className="shadow-sm transition-shadow duration-300 hover:shadow-md"
      title={
        <ASpace>
          <IconAntDesignInboxOutlined className="text-green-500" />
          <Text strong>Receiver Component</Text>
        </ASpace>
      }
    >
      {message ? <MessageDisplay /> : <EmptyMessage />}
    </ACard>
  );
}

export function Component() {
  return (
    <ACard
      bordered={false}
      className="h-full card-wrapper"
      size="small"
    >
      <Title
        className="mb-8 text-center"
        level={2}
      >
        Event Bus Example: Sibling Communication
      </Title>
      <ASpace
        className="w-full"
        direction="vertical"
        size="large"
      >
        <Sender />
        <Receiver />
      </ASpace>
    </ACard>
  );
}

Component.displayName = 'EventBusDemo';
