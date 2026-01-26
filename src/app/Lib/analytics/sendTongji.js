import { Remote } from './../Remote';
import md5 from "md5";
import sha1 from "sha1";

const sendTongji = (id,type,op={}) => {
  const isEmulator = () => /emulator|android sdk|genymotion|x86/.test(navigator.userAgent.toLowerCase()) ? 1 : 0;
  const {sendType="thonji",uri="data/tongji"} = op;
  const getUUID = () => {
    let uuid = localStorage.getItem("device_uuid");
    if (!uuid) {
      uuid = crypto.randomUUID();
      localStorage.setItem("device_uuid", uuid);
    }
    return uuid;
  };

  const width = Math.round(window.screen.width * window.devicePixelRatio);
  const height = Math.round(window.screen.height * window.devicePixelRatio);
  const uuid = getUUID();

  const channel = "h001";

  const makeSign = (channel, type, uuid, id) => sha1(md5("sehe" + channel + type + uuid + id));

  let formData = new FormData();

  if(sendType == "thonji") {
    formData.append("isEmulators", isEmulator());
    formData.append("width", width);
    formData.append("height", height);
    formData.append("brand", "xiaomi");
    formData.append("model", "2211133C");
    formData.append("manufacturer", "xiaomi");
    formData.append("release", "14");
    formData.append("sdk_int", 34);
    formData.append("ua", navigator.userAgent);
    formData.append("channel", channel);
    formData.append("time", Date.now());
    formData.append("uuid", uuid);
    formData.append("uuid3", uuid);
    formData.append("id", id);
    formData.append("type", type);
    formData.append("sign", makeSign(channel, type, uuid, id));
  } else {
    formData.append("isEmulators", isEmulator());
    formData.append("channel", channel);
    formData.append("time", Date.now());
    formData.append("uuid", uuid);
    formData.append("uuid3", uuid);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("brand", "xiaomi");
    formData.append("model", "2211133C");
    formData.append("manufacturer", "xiaomi");
    formData.append("release", "14");
    formData.append("sdk_int", 34);
    formData.append("ua", navigator.userAgent);
  }
  try {
    const { data, status } = Remote.post(uri, formData);
    if (status === 200) console.log("Tongji success:", data);
  } catch (err) {
    console.error("Tongji error:", err);
  }
};

export default sendTongji;
