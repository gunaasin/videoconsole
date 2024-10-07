
import React, { useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor";

export const Frame = () => {

  const [decryptedData, setDecryptedData] = useState("");

  // Function to decrypt the URL data
  const decryptURL = async (encryptedBase64, ivBase64, password) => {
    const enc = new TextEncoder();
    const encodedPassword = enc.encode(password);

    // Convert Base64 back to bytes
    const encryptedBytes = new Uint8Array(atob(encryptedBase64).split('').map(char => char.charCodeAt(0)));
    const ivBytes = new Uint8Array(atob(ivBase64).split('').map(char => char.charCodeAt(0)));

    // Derive the key again from the password
    const key = await crypto.subtle.importKey(
      "raw",
      encodedPassword,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    const aesKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: enc.encode("some-salt"),
        iterations: 100000,
        hash: "SHA-256"
      },
      key,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBytes
      },
      aesKey,
      encryptedBytes
    );

    return new TextDecoder().decode(decrypted);
  };

  // useEffect to extract query params and decrypt on component mount
  useEffect(() => {
    const decryptData = async () => {
      const password = "my-password"; // Ensure this matches the encryption password

      // Extract URL parameters (encrypted data and IV)
      const queryParams = new URLSearchParams(window.location.search);
      const encryptedBase64 = queryParams.get("url");
      const ivBase64 = queryParams.get("iv");

      if (encryptedBase64 && ivBase64) {
        // Decrypt the data
        const decryptedURL = await decryptURL(encryptedBase64, ivBase64, password);
        setDecryptedData(decryptedURL);
      }
    };

    decryptData();
  }, []);
 
  // console.log("Windo Location:" , window.location);
  // const key = window.location.search;
  // const urlParam = new URLSearchParams(key);
  // const finalurl =urlParam.get('url');
  // console.log(finalurl)

  return (
    <div className='framebox'>
      <div className="topbox">
        <img src="codelogo.png" alt="" />
      <div className="video">
      <iframe width="871" height="500" src={decryptedData} title="APIs Explained (in 4 Minutes)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
     

      <div className='compiler'> 
      <CodeEditor />
      </div>
       
    </div>
  )
}
