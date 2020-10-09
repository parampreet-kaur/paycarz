export interface FeedbackModel{
    feedbackId: number;
    fname: string;
    lname: string;
    contactNo: string;
    email: string;
    comment: string;
    dateAndTime: string;
    status: FeedbackStatus;
}

export enum FeedbackStatus {
    notApproved = 1,
    approved
}