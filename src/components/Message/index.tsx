// src/hooks/useMessageFunctions.tsx
import { Button, message } from "antd";
import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

export function useMessageFunctions() {
  const [messageApi, contextHolder] = message.useMessage();

  const messageSuccess = (msg: string | ReactNode, key = "msg_key") => {
    messageApi.open({
      key,
      type: 'success',
      content: (
        <>
          {msg}
          <Button
            style={{ marginLeft: 5 }}
            type="text"
            size="small"
            onClick={() => messageApi.destroy(key)}
            icon={<MdClose style={{ color: 'white' }} />}
          />
        </>
      ),
      duration: 4,
    });
  };

  const messageError = (msg: string | ReactNode, key = "msg_key") => {
    messageApi.open({
      key,
      type: 'error',
      content: (
        <>
          {msg}
          <Button
            style={{ marginLeft: 5 }}
            type="text"
            size="small"
            onClick={() => messageApi.destroy(key)}
            icon={<MdClose style={{ color: 'white' }} />}
          />
        </>
      ),
      duration: 4,
    });
  };

  return { messageSuccess, messageError, contextHolder };
}
