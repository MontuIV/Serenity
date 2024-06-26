import { apiSlice } from "@/app/api/apiSlice";
import Medicate from "./entities/Medicate";
import CreateMedicateDto from "./dto/CreateMedicateDto";
import UpdateMedicateDto from "./dto/UpdateMedicateDto";

interface MedicatePrep<DataType = unknown> {
    actionId?: number;
    dogId?: string;
    data?: DataType;
}

export const medicateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMedicate: builder.mutation<Medicate, MedicatePrep<CreateMedicateDto>>({
            query: ({ data }) => ({
                url: `medicate`,
                method: "POST",
                body: { ...data },
            }),
            invalidatesTags: ["Medicate"],
        }),
        getMedicate: builder.query<Medicate, MedicatePrep>({
            query: ({ actionId }) => ({ url: `/medicate/${actionId}` }),
            providesTags: ["Medicate"],
        }),
        getAllMedicate: builder.query<Medicate[], MedicatePrep>({
            query: ({ dogId }) => ({ url: `/dogs/${dogId}/medicate` }),
            providesTags: ["Medicate"],
        }),
        updateMedicate: builder.mutation<Medicate, MedicatePrep<UpdateMedicateDto>>({
            query: ({ actionId, data }) => ({
                url: `medicate/${actionId}`,
                method: "PATCH",
                body: { ...data },
            }),
            invalidatesTags: ["Medicate"],
        }),
        deleteMedicate: builder.mutation<Medicate, MedicatePrep>({
            query: ({ actionId }) => ({
                url: `medicate/${actionId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Medicate"],
        }),
    }),
});

export const {
    useCreateMedicateMutation,
    useDeleteMedicateMutation,
    useUpdateMedicateMutation,
    useGetMedicateQuery,
    useLazyGetMedicateQuery,
    useGetAllMedicateQuery,
    useLazyGetAllMedicateQuery,
} = medicateApiSlice;
