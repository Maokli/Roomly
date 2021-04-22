import { Photo } from "./photo";
import { Term } from "./term";

export interface Member {
        id?: number;
        userName: string;
        firstName: string;
        lastName: string;
        photoUrl: string;
        age?: number;
        dateOfBirth: Date;
        joined?: Date;
        lastActive?: Date;
        gender: string;
        description: string;
        interests: string;
        interestsArray?: string[];
        country: string;
        city: string;
        budget: number;
        photos?: Photo[];
        doesDrink: boolean;
        doesSmoke: boolean;
        hasPets: boolean;
        hasLivedWithSomeoneBefore: boolean;
        hasAllergies: boolean;
        isMovingAlone: boolean;
        termsAndConditions: Term[];
}
