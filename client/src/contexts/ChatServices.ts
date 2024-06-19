import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

class ChatServices {
  private connection: HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7297/hub")
      .build();

    this.connection.on("ReceiveMessage", (user, message) => {
      console.log(user, message);
    });

    this.connection.start()
      .catch(err => console.error(err.toString()));
  }

  joinConversation(conversationId: string) {
    this.connection.invoke("JoinConversation", conversationId)
      .catch(err => console.error(err.toString()));
  }

  leaveConversation(conversationId: string) {
    this.connection.invoke("LeaveConversation", conversationId)
      .catch(err => console.error(err.toString()));
  }

  async getNumberOfMembersInConversation(conversationId: string): Promise<number> {
    try {
      const count = await this.connection.invoke<number>("GetNumberOfMembersInConversation", conversationId);
      return count;
    } catch (err: any) {
      console.error(err.toString());
      return 0;
    }
  }
}

export default new ChatServices();