import Event from "./event";
import { EventAction } from "./event-action";
import EmailHelper from "../services/email-service";
import axios from "axios";

export function subscribers(): void {
  Event.on(EventAction.PROPERTY_CREATED, (data: any) => {
    const time = 1000  * 60 * 20;
    setTimeout(() => {
      console.log("Called after 20 mins");
      const helper = new EmailHelper();
      helper.notify(data);
    }, time);
    console.log("timer set for", time);
  });

  Event.on(EventAction.PROPERTY_CREATED, (data: any) => {
    const time = 1000  * 60 * 5;
    setTimeout(async () => {
      console.log("Called after 5 mins");
      try{
          const webHook = process.env.WEBHOOK_URL || "";
          if (webHook) {
            await axios.post(webHook, JSON.stringify(data));
          }
      }catch(e){
          console.log(e)
      }
    }, time);
    console.log("timer set for", time);
  });
}
