import { imageFour, imageOne, imageThree, imageTwo } from "@/assets/images";

const cardImages: CardImages[] = [
    {
        title: 'Necklace',
        description: 'Beautiful necklace for any occasion',
        image: imageOne,
        price: 200,
        link: 'https://example.com/necklace'
    },
    {
        title: 'Necklace',
        description: 'Stylish Necklace to complement any outfit',
        image: imageTwo,
        price: 100,
        link: 'https://example.com/earrings'
    },
    {
        title: 'Bracelet',
        description: 'Elegant bracelet for a touch of luxury',
        image: imageFour,
        price: 150,
        link: 'https://example.com/bracelet'
    },
    {
        title: 'Ring',
        description: 'Exquisite ring for a special occasion',
        image: imageThree,
        price: 250,
        link: 'https://example.com/ring'
    }
];



export {
    cardImages
}