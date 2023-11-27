import { apiSlice } from "@/app/api/apiSlice";
import CreateShelterDto from "@/app/api/features/shelter/dto/CreateShelterDto";
import Shelter from "./entities/Shelter";
import UpdateShelterDto from "./dto/UpdateShelterDto";
import Caretaker from "../caretaker/entities/Caretaker";
import Kennel from "../kennel/entities/Kennel";
import Dog from "../dog/entities/Dog";

interface ShelterPrep<DataType = unknown> {
    shelterUuid: string;
    data?: DataType;
}

export const shelterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createShelter: builder.mutation<Shelter, CreateShelterDto>({
            query: (data) => ({
                url: "/shelters",
                method: "POST",
                body: { ...data },
            }),
        }),
        getAllKennels: builder.query<Kennel[], ShelterPrep>({
            query: ({ shelterUuid }) => ({
                url: `/shelters/getAllKennels/${shelterUuid}`,
            }),
            providesTags: ["Kennel"],
        }),
        getAllCaretakers: builder.query<Caretaker[], ShelterPrep>({
            query: ({ shelterUuid }) => ({
                url: `/shelters/getAllCaretakers/${shelterUuid}`,
            }),
            providesTags: ["Caretaker"],
        }),
        getAllDogs: builder.query<Dog[], ShelterPrep>({
            query: ({ shelterUuid }) => ({
                url: `/shelters/getAllDogs/${shelterUuid}`,
            }),
            providesTags: ["Dog"],
        }),
        getByUuid: builder.query<Shelter, ShelterPrep>({
            query: ({ shelterUuid }) => ({ url: `/shelters/${shelterUuid}` }),
        }),
        updateShelter: builder.mutation<Shelter, ShelterPrep<UpdateShelterDto>>({
            query: ({ shelterUuid, data }) => ({
                url: `/shelters/${shelterUuid}`,
                method: "PATCH",
                body: { ...data },
            }),
        }),
        deleteShelter: builder.mutation<Shelter, ShelterPrep>({
            query: ({ shelterUuid }) => ({
                url: `/shelters/${shelterUuid}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateShelterMutation,
    useDeleteShelterMutation,
    useGetAllCaretakersQuery,
    useGetByUuidQuery,
    useLazyGetAllCaretakersQuery,
    useLazyGetByUuidQuery,
    useUpdateShelterMutation,
    useGetAllKennelsQuery,
    useLazyGetAllKennelsQuery,
    useGetAllDogsQuery,
    useLazyGetAllDogsQuery,
} = shelterApiSlice;
