import { useRoute, useRouter } from "vue-router";

export const useQueryParams = () => {
    const router = useRouter();
    const route = useRoute();
    const setQueryParams = (search) => {
        router.replace({ name: 'table', query: { search } });
    };
    const queryParamsExist = () => {
        return Object.keys(route.query).length > 0;
    }
    return {
        setQueryParams,
        route,
        queryParamsExist,
    }
}
