import { toast } from "react-toastify";

export const logError = (err) => {
  toast.error(err.response.status + " " + err.response.statusText, {
    theme: "colored",
  });
  console.log(err);
};
