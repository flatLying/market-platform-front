const apiHostUrl = process.env.API_HOST_URL ? process.env.API_HOST_URL : "http://localhost:8080";

/**
 * 查询奖品列表
 */
export const queryRaffleAwardList = () => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/queryAwardList`, {
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

export const randomRaffle = () => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/randomRaffle`,{
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
