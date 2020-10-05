import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { CityModel } from '../models/city.model';
import { StateModel } from '../models/state.model';
import { SubCategoryModel } from '../models/sub-category.model';
import { map } from 'rxjs/operators';
import { CountryModel } from '../models/country.model';
import { CustomerModel } from '../models/customer.model';
import { IdentifiersModel } from '../models/identifiers.model';

export class AppDataService{

    constructor(private http: HttpClient){
        // this.http
        //     .post(
        //         'https://paycarz.firebaseio.com/identifiers.json',
        //         this.identifiers[0]
        //     ).subscribe();
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

    addNewCustomer(customer: CustomerModel){
        //update customer
        this.http.post(
            'https://paycarz.firebaseio.com/customer.json',
            customer
        ).subscribe();

        //update customerId in identifiers
    }

    getCurrentCustomerId(){
        return this.http
            .get<{ [key: string]: IdentifiersModel }>(
                'https://paycarz.firebaseio.com/identifiers.json'
            )
            .pipe(
                map(responseData => {
                    let customerId: number;
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key)){
                            if(responseData[key].fieldName === 'customerId')
                            {
                                customerId = responseData[key].currentValue;
                            }
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


}