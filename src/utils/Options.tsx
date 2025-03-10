import { BudgetOption, PeopleOption } from "./Types";

export const SelectTravelsList:PeopleOption[] =[
    {
        id: 1,
        title: 'Solo Adventure',
        desc: 'Embark on a journey of self-discovery and exploration.',
        icon: '🧍',
        people: '1',
    },
    {
        id: 2,
        title: 'Romantic Getaway',
        desc: 'Share unforgettable moments with your special someone.',
        icon: '❤️',
        people: '2',
    },
    {
        id: 3,
        title: 'Family Fun',
        desc: 'Create lasting memories with your loved ones.',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5',
    },
    {
        id: 4,
        title: 'Group Escape',
        desc: 'Enjoy epic adventures with your friends!',
        icon: '🍻',
        people: '5 or more',
    }
]


export const SelectBudgetOptions:BudgetOption[] = [
    {
        id: 1,
        title: 'Budget-Friendly',
        desc: 'Explore more while spending less!',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Balanced Comfort',
        desc: 'A perfect mix of affordability and luxury.',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Ultimate Luxury',
        desc: 'Indulge in the finest experiences money can buy.',
        icon: '🏦',
    }
]
