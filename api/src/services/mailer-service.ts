export interface SendTemplateParams {
  template: string,
  to: {name?: string, address: string}[],
  vars?: { [key: string]: string | number},
  replyTo?: string
}

export class MailerService {
  /**
   * Send an email
   *
   * @link JobScheduler#sendTemplate
   *
   * @param {Object} params
   * @param {string} params.template Email template
   * @param {{address: string, name?: string}[]} params.to Email recipient
   * @param {Object} [params.vars] Data being available to an email template
   * @param {string} [params.replyTo] Email reply-to
   */
  async sendTemplate(params: SendTemplateParams) {
    console.log('MailerService: email sent', params); //XXX
  }
}

export default MailerService;
