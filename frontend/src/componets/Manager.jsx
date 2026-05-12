import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import {
  fas,
  faCopy,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";

import { ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", Password: "" });
  const [passwordArray, setPasswordArray] = useState([]);


  const getPasswords = async() => {
     let req = await fetch("http://localhost:3000/")
      let passwords = await req.json()

     console.log(passwords)
      setPasswordArray(passwords);
    
  }
  

  useEffect(() => {
   getPasswords()
   
  }, []);

  const copyText = (text) => {
    toast("🦄 copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("images/eyeclosed.png")) {
      ref.current.src = "images/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "images/eyeclosed.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    if(form.site.length > 3 && form.username.length >3 && form.Password.length > 3){

       await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:form.id})
      })

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/",{method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form,id:uuidv4()})
      })
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]),
      // );
      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", Password: "" });
      
      toast("🦄 Password Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      toast("Error : passsword not saved")
    }
  };

  const deletePassword = async(id) => {
    console.log("passowrd deleted by uuidv", id);
    let c = confirm("Do you really want to delete this password");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id)),
      // );
       let res = await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id})
      })
    }
    toast("☠️ Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = (id) => {
    console.log("passowrd edited by uuidv", id);
    setform({...passwordArray.filter((i) => i.id === id)[0],id:id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full mx-auto bg-green-50">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[97%] translate-y-[0%] rounded-full bg-[rgba(137,175,142,0.5)] opacity-50 blur-[80px]"></div>
      </div>{" "}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl text font-bold text-center mx-auto ">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className=" flex flex-col text-black p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              id="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.Password}
                onChange={handleChange}
                name="Password"
                placeholder="Enter Password"
                className="rounded-full border  border-green-500 w-full p-4 py-1"
                type="password"
                id="password"
              />
              <span
                className="absolute right-[5px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="w-9 p-2"
                  src="images/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 border border-green-900 hover:bg-green-400 rounded-full px-5 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}

          {passwordArray.length !== 0 && (
            
              <table className="table-auto w-full rounded-md">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="flex items-center justify-center py-2 border border-white text-center">
                          <div className="flex items-center justify-center">
                            <a href={item.site} target="blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 border border-white text-center ">
                          <div className="flex items-center justify-center">
                            {item.username}{" "}
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center">
                            {(item.Password)}
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.Password);
                              }}
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <span
                            className="cursor-pointer mx-2"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </span>
                          <span
                            className="cursor-pointer mx-2"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
