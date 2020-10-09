import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { CityModel } from '../models/city.model';
import { StateModel } from '../models/state.model';
import { SubCategoryModel } from '../models/sub-category.model';
import { map } from 'rxjs/operators';
import { CountryModel } from '../models/country.model';
import { CustomerModel } from '../models/customer.model';
import { IdentifiersModel } from '../models/identifiers.model';
import { AuthService } from './auth.service';
import { CarModel } from '../models/car.model';
import { CarImageModel } from '../models/car-image.model';
import { FeedbackModel } from '../models/feedback.model';
import { HeaderImageModel } from '../models/header-image.model';
import { AgencyModel } from '../models/agency.model';
import { AgencyOwnerModel } from '../models/agency-owner.model';

export class AppDataService{

    constructor(private http: HttpClient, private authService: AuthService){
        // this.http
        //     .post(
        //         'https://paycarz.firebaseio.com/headerImages.json',
        //         {
        //             'imageUrl': 'https://pngriver.com/wp-content/uploads/2018/04/Download-Car-PNG-Pic.png',
        //         }
        //     ).subscribe(resData => {

        //     });
    }

    getCategories(){
        return this.http
            .get<{ [key: string]: CategoryModel }>(
                'https://paycarz.firebaseio.com/categories.json'
            )
            .pipe(
                map(responseData => {
                    const categoriesArray: CategoryModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            categoriesArray.push({ ...responseData[key]});
                        }
                    }
                    return categoriesArray;
                })
            );
    }

    getSubCategories(){
        return this.http
            .get<{ [key: string]: SubCategoryModel }>(
                'https://paycarz.firebaseio.com/subCategories.json'
            )
            .pipe(
                map(responseData => {
                    const subCategoriesArray: SubCategoryModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            subCategoriesArray.push({ ...responseData[key]});
                        }
                    }
                    return subCategoriesArray;
                })
            );
    }

    getCountries(){
        return this.http
            .get<{ [key: string]: CountryModel }>(
                'https://paycarz.firebaseio.com/countries.json'
            )
            .pipe(
                map(responseData => {
                    const countriesArray: CountryModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            countriesArray.push({ ...responseData[key]});
                        }
                    }
                    return countriesArray;
                })
            );
    }

    getStates(){
        return this.http
            .get<{ [key: string]: StateModel }>(
                'https://paycarz.firebaseio.com/states.json'
            )
            .pipe(
                map(responseData => {
                    const statesArray: StateModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            statesArray.push({ ...responseData[key]});
                        }
                    }
                    return statesArray;
                })
            );
    }

    getCities(){
        return this.http
            .get<{ [key: string]: CityModel }>(
                'https://paycarz.firebaseio.com/cities.json'
            )
            .pipe(
                map(responseData => {
                    const citiesArray: CityModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            citiesArray.push({ ...responseData[key]});
                        }
                    }
                    return citiesArray;
                })
            );
    }

    getCars(){
        return this.http
            .get<{ [key: string]: CarModel }>(
                'https://paycarz.firebaseio.com/cars.json'
            )
            .pipe(
                map(responseData => {
                    const carsArray: CarModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            carsArray.push({ ...responseData[key]});
                        }
                    }
                    return carsArray;
                })
            );
    }

    getCarImages(){
        return this.http
            .get<{ [key: string]: CarImageModel }>(
                'https://paycarz.firebaseio.com/carImages.json'
            )
            .pipe(
                map(responseData => {
                    const carImagesArray: CarImageModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            carImagesArray.push({ ...responseData[key]});
                        }
                    }
                    return carImagesArray;
                })
            );
    }

    addNewCustomer(customer: CustomerModel){
        //update customer
        this.http.post(
            'https://paycarz.firebaseio.com/customer.json',
            customer
        ).subscribe();

        //updating the customerId
        this.http.delete('https://paycarz.firebaseio.com/customerId.json').subscribe();
        this.http.post(
            'https://paycarz.firebaseio.com/customerId.json',
            {
                'currentValue': customer.customerId
            }
        ).subscribe();
    }

    getCurrentCustomerId(){
        return this.http
            .get<{ [key: string]: IdentifiersModel }>(
                'https://paycarz.firebaseio.com/customerId.json'
            )
            .pipe(
                map(responseData => {
                    let customerId: IdentifiersModel;
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            customerId = responseData[key];
                        }
                    }
                    return customerId;
                })
            );
    }

    getCustomers(){
        return this.http
            .get<{ [key: string]: CustomerModel }>(
                'https://paycarz.firebaseio.com/customer.json'
            )
            .pipe(
                map(responseData => {
                    const customersArray: CustomerModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            customersArray.push({ ...responseData[key]});
                        }
                    }
                    return customersArray;
                })
            );
    }

    addNewFeedback(feedback: FeedbackModel){
        this.http.post(
            'https://paycarz.firebaseio.com/feedbacks.json',
            feedback
        ).subscribe();

        //updating the feedbackId
        this.http.delete('https://paycarz.firebaseio.com/feedbackId.json').subscribe();
        this.http.post(
            'https://paycarz.firebaseio.com/feedbackId.json',
            {
                'currentValue': feedback.feedbackId
            }
        ).subscribe();
    }

    getCurrentFeedbackId(){
        return this.http
            .get<{ [key: string]: IdentifiersModel }>(
                'https://paycarz.firebaseio.com/feedbackId.json'
            )
            .pipe(
                map(responseData => {
                    let feedbackId: IdentifiersModel;
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            feedbackId = responseData[key];
                        }
                    }
                    return feedbackId;
                })
            );
    }

    getFeedbacks(){
        return this.http
            .get<{ [key: string]: FeedbackModel }>(
                'https://paycarz.firebaseio.com/feedbacks.json'
            )
            .pipe(
                map(responseData => {
                    const feedbacksArray: FeedbackModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            feedbacksArray.push({ ...responseData[key]});
                        }
                    }
                    return feedbacksArray;
                })
            );
    }

    getHeaderImages(){
        return this.http
            .get<{ [key: string]: HeaderImageModel }>(
                'https://paycarz.firebaseio.com/headerImages.json'
            )
            .pipe(
                map(responseData => {
                    const imagesArray: HeaderImageModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            imagesArray.push({ ...responseData[key]});
                        }
                    }
                    return imagesArray;
                })
            );
    }

    getAgencies(){
        return this.http
            .get<{ [key: string]: AgencyModel }>(
                'https://paycarz.firebaseio.com/agencies.json'
            )
            .pipe(
                map(responseData => {
                    const agenciesArray: AgencyModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            agenciesArray.push({ ...responseData[key]});
                        }
                    }
                    return agenciesArray;
                })
            );
    }

    getAgencyOwners(){
        return this.http
            .get<{ [key: string]: AgencyOwnerModel }>(
                'https://paycarz.firebaseio.com/agencyOwners.json'
            )
            .pipe(
                map(responseData => {
                    const agencyOwnersArray: AgencyOwnerModel[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            agencyOwnersArray.push({ ...responseData[key]});
                        }
                    }
                    return agencyOwnersArray;
                })
            );
    }

}