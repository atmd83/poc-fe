"use client";

import axios from "axios";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

const API_URL = "http://localhost:3001/v1/user";

export const createMessage = async (address: any, statement: any) => {
  const nonce = await axios.get(`${API_URL}/nonce`, { withCredentials: true });

  console.log(window.location.host, window.location.origin);

  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement,
    uri: window.location.origin,
    version: "1",
    chainId: 1,
    nonce: nonce.data,
  });
  return message.prepareMessage();
};

export const sign = async (msg: string) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();

  provider
    .send("eth_requestAccounts", [])
    .catch(() => console.log("user rejected request"));

  const message = await createMessage(signer.address, msg);

  return [await signer.signMessage(message), message];
};

export const verify = async (message: string, signature: string) => {
  const verification = await axios.post(
    `${API_URL}/verify`,
    {
      message,
      signature,
    },
    { withCredentials: true }
  );
  return verification.data;
};
