export interface DeleteUserEventsParams {
  userId: string
}

export class EventService {
  /**
   * @link JobScheduler#deleteUserEvents
   */
  async deleteUserEvents(params: DeleteUserEventsParams) {
    console.log('EventService: User events deleted', params); //XXX
  }

}

export default EventService;
