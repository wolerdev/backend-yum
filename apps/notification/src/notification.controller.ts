import { Controller, Get, Inject } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,

  ) { }

  @MessagePattern("email_notification")
  messageHello(@Payload() data: any, @Ctx() context: RmqContext): string {
    return this.notificationService.sendEmail();
  }
  @MessagePattern("order_delivered")
  async orderDelivereds(
    @Ctx() context: RmqContext,
    @Payload() data: any,
  ): Promise<any> {
    const { orderId } = data;
    console.log("order_delivered", orderId);
    return this.notificationService.sendInvoice(orderId);
  }
}
