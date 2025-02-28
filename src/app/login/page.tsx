"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/util/firebase";
import { Button, Form, Input, Row, message } from "antd";
import { LockOutlined, MergeOutlined, UserOutlined } from "@ant-design/icons";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

export default function LoginPage() {
  const [form] = Form.useForm()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const messageError = () => {
    messageApi.open({
      type: 'error',
      content: 'Verifique as informações e tente novamente',
      duration: 100000
    });
  };

  async function handleLogin() {
    try {
      const validated = await form.validateFields()
      if (validated) {
        await signInWithEmailAndPassword(auth, validated?.email, validated?.password);
        window.location.href = "/admin";
      }
    } catch (error) {
      messageError()
    }
  }

  return (
    <div className="login">
      {contextHolder}
      <div className="content">
        <div className="icon">
          <MergeOutlined />
        </div>
        <p className={`label ${inter.className}`}>Painel Administrador</p>
        <Form form={form} layout="vertical" requiredMark={false}>
          <Row justify="center" style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item name="email" label="" rules={[{ required: true, message: 'Por favor, informe um e-mail' }]}>
              <Input
                addonBefore={<UserOutlined />}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </Form.Item>
          </Row>
          <Row justify="center">
            <Form.Item name="password" label="" rules={[{ required: true, message: 'Por favor, informe uma senha' }]}>
              <Input
                addonBefore={<LockOutlined />}
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </Form.Item>
          </Row>
          <Row justify="center">
            <Button onClick={handleLogin} className="login-button">Entrar</Button>
          </Row>
        </Form>

      </div>
    </div>
  );
}
