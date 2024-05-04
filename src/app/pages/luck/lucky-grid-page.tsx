"use client"

import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import { LuckyGrid } from '@lucky-canvas/react';
import { queryRaffleAwardList, randomRaffle } from "@/apis";
import { RaffleAwardVO } from "@/types/RaffleAwardVO";

export function LuckyGridPage() {
    const [blocks] = useState([{ padding: '10px', background: '#869cfa' ,
        imgs: [{src: "https://pic3.zhimg.com/v2-230b33bf409772ea9a62be47d25cf816_r.jpg"}]}]);
    const [prizes, setPrizes] = useState([]);
    const [buttons] = useState([{ x: 1, y: 1, background: "#7f95d1", fonts: [{ text: '开始', top: '35%' }] }]);
    const [defaultStyle] = useState([{ background: "#b8c5f2" }]);
    const myLucky = useRef(null);

    // 查询奖品列表并更新状态
    const queryAwardListHandler = async () => {
        const response = await queryRaffleAwardList();
        const {code, info, data} = await response.json();
        if (code != "200") {
            window.alert("获取奖品列表失败");
            return;
        }
        const sortedData = data.sort((a: RaffleAwardVO, b:RaffleAwardVO) => a.awardIndex - b.awardIndex);
        // 创建一个新的奖品列表
        const coordinates = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 1, y: 2 },
            { x: 0, y: 2 },
            { x: 0, y: 1 },
        ];
        const prizes = sortedData.map((award: RaffleAwardVO, index: number) => {
            const { x, y } = coordinates[index % coordinates.length];
            return {
                x,
                y,
                fonts: [{
                    text: award.awardTitle,
                    top: '30px',
                    fontSize: '14px',
                    fontStyle: 'Roboto'
                }],
                background: index % 2 === 0 ? '#e9e8fe' : '#e9e8fe'
            };
        });

        setPrizes(prizes);
    };

    // 处理抽奖逻辑
    const randomRaffleHandler = async () => {
        const ans = await randomRaffle();
        const { code, data } = await ans.json();
        if (code != "200") {
            window.alert("抽奖失败，请稍后再尝试");
            return;
        }
        return data.awardIndex;
    };

    useEffect(() => {
        queryAwardListHandler();
    }, []);

    return (
        <>
            <LuckyGrid
                ref={myLucky}
    width="300px"
    height="300px"
    rows="3"
    cols="3"
    prizes={prizes}
    defaultStyle={defaultStyle}
    buttons={buttons}
    blocks={blocks}
    onStart={() => {
        myLucky.current.play();
        setTimeout(() => {
            randomRaffleHandler().then(prizeIndex => {
                myLucky.current.stop(prizeIndex);
            });
        }, 2500);
    }}
    onEnd={prize => {
        alert('恭喜你抽到 ' + prize.fonts[0].text + ' 奖品');
    }}>
    </LuckyGrid>
    </>
);
}


