import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // useRef HOOk
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()_+-=[]{}|;':,./<>?";
    }

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center ">
      <h1 className="text-6xl font-bold text-center p-7 text-white">
        Password Generator
      </h1>

      <div className="flex flex-row items-center justify-center">
        <input
          type="text"
          value={Password}
          placeholder="Password"
          className="input input-bordered input-primary w-96"
          readOnly
          ref={passwordRef}
        />
        <button className="btn ml-7" onClick={copyPasswordToClipboard}>
          Copy
        </button>
      </div>
      <div className="flex flex-col items-center justify-center  mt-10">
        <div className="flex flex-col items-center justify-center w-96">
          <input
            type="range"
            min={6}
            max="100"
            value={length}
            className="range range-primary cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>
            <h3>Length : {length}</h3>{" "}
          </label>
        </div>
        <div className="flex flex-row items-center justify-center mt-10">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-11">
                <h3 className="text-2xl">numbers: </h3>{" "}
              </span>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                className="checkbox checkbox-primary"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-11">
                <h3 className="text-2xl">characters: </h3>{" "}
              </span>
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id="characterInput"
                className="checkbox checkbox-primary"
                onChange={() => setCharacterAllowed((prev) => !prev)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
