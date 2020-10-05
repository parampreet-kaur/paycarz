import { CustomerService } from './customer-service.model';

export class CustomerServiceService{
    customerServices: CustomerService[] = [
        new CustomerService("las la-user-tag", "Booking at special rates", "We provide special rates for customers that book cars often so that our relationship stays strong."),
        new CustomerService("las la-gift", "Best Plans", "You can always rely on us for this. Best plans are provided to the agency owners and also to the customers."),
        new CustomerService("lab la-telegram-plane", "Direct Deals", "We compare car rent deals from all major car rental agencies to find you the best prices available."),
        new CustomerService("las la-map-signs", "One way Car Rentals", "Our deals on one-way car rental can be great for relocating, road trip adventures, and many more things.")
    ];
    
    getCustomerServices(){
        return this.customerServices.slice();
    }
}