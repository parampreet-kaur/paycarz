export enum BookingStatus{
    pending = 1,
    confirmed
}

export interface BookingModel{
    bookingId: number;
    customerId: number;
    carId: number;
    fromCityId: number;
    toCityId: number;
    dateOfTravel: string;
    dateAndTime: string;
    status: BookingStatus;
    categoryId?: number;
    subCategoryId?: number;
}