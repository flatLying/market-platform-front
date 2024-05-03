const apiHostUrl = process.env.API_HOST_URL ? process.env.API_HOST_URL : "http://127.0.0.1:4523/m1/3838818-3472149-default";

/**
 * 查询奖品列表
 */
export const queryRaffleAwardList = (strategyId: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/query_raffle_award_list?strategyId=${strategyId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (e) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

export const randomRaffle = (strategyId: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/random_raffle?strategyId=${strategyId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (e) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}
