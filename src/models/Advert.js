export default class Advert {
    id;
    name;
    photo;
    description;
    price;
    type;
    tags;
    createdAt;
    updatedAt;

    constructor( advert ) {
        this.id = advert._id;
        this.name = advert.name;
        this.photo = (advert.photo.startsWith('/images/anuncios/') ? `http://localhost:3001${advert.photo}` : advert.photo);
        this.description = advert.description;
        this.price = advert.price;
        this.type = advert.type;
        this.tags = advert.tags;
        this.createdAt = advert.createdAt;
        this.updatedAt = advert.updatedAt;
    }
}