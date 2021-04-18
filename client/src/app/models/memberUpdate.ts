import { Photo } from "./photo";
import { Term } from "./term";

export interface MemberUpdate {
        userName: string;
        firstName: string;
        lastName: string;
        photoUrl: string;
        dateOfBirth: Date;
        gender: string;
        description: string;
        interests: string;
        country: string;
        city: string;
        budget: number;
        doesDrink: boolean;
        doesSmoke: boolean;
        hasPets: boolean;
        hasLivedWithSomeoneBefore: boolean;
        hasAllergies: boolean;
        isMovingAlone: boolean;
        termsAndConditions: Term[];
}
