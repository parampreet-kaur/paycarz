export class GalleryService{
    galleryImages: string[] = [
        "https://www.autoremarketing.com/sites/default/files/styles/story_page_main_image/public/HappyCustomer.jpg?itok=fSGhX6jR",
        "https://hyackexceltire.com/_images/_pages/happycustomer_800x450.jpg",
        "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/story/hero_image/2019-Mazda3-hatch-Red-1001x565.jpg",
        "https://news.brannonhonda.com/wp-content/uploads/sites/8/2016/05/Brannon-Honda-Customer-Service-1.jpg",
        "https://images.techhive.com/images/article/2017/05/car_salesman_auto_dealer_keys-100722520-large.jpg",
        "https://www.tesla.com/sites/default/files/styles/customer_2x_mobile_1200x816/public/customer-stories/b-l-lunch/marc_lester_1.jpg?itok=2uqZMNsw&timestamp=1510788409"
    ];
    getGalleryImages(){
        return this.galleryImages.slice();
    }
}