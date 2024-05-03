"use client"

import React, {useState, useRef, useEffect} from 'react'
import { LuckyWheel } from '@lucky-canvas/react'
import {RaffleAwardVO} from "@/types/RaffleAwardVO";
import {queryRaffleAwardList, randomRaffle} from "@/apis";

export function LuckyWheelPage() {
    const [blocks] = useState([
        { padding: '10px', background: '#869cfa' }
    ])

    const queryParams = new URLSearchParams(window.location.search);
    const strategyId = Number(queryParams.get("strategyId"));

    // 查询奖品
    const queryAwardListHandler = async () => {
        const response = await queryRaffleAwardList(strategyId);
        const {code, info, data} = await response.json();
        if (code != "0000") {
            window.alert("获取奖品列表失败");
            return;
        }
        // 创建一个新的奖品列表
        const prize = data.map((award: RaffleAwardVO, index: number) => {
            const background = index % 2 === 0 ? '#e9e8fe' : '#b8c5f2';
            return {
                background: background,
                fonts: [{id: award.awardId, text: award.awardTitle, top: '15px'}]
            }
        });
        setPrizes(prize);
    }

    // 调用初始化的函数
    useEffect(() => {
        queryAwardListHandler().then(r => {});
    }, []) // 添加空数组作为依赖项


    const [prizes,setPrizes] = useState([{}])
    const [buttons] = useState([
        { radius: '40%', background: '#617df2' },
        { radius: '35%', background: '#afc8ff' },
        {
            radius: '30%', background: '#869cfa',
            pointer: true,
            fonts: [{ text: '开始', top: '-10px' }]
        }
    ])
    const myLucky = useRef()
    return <div>
        <LuckyWheel
            ref={myLucky}
            width="300px"
            height="300px"
            blocks={blocks}
            prizes={prizes}
            buttons={buttons}
            onStart={() => { // 点击抽奖按钮会触发star回调
                myLucky.current.play()
                setTimeout(() => {
                    const index = Math.random() * 6 >> 0
                    myLucky.current.stop(index)
                }, 2500)
            }}
            onEnd={prize => { // 抽奖结束会触发end回调
                alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品')
            }}
        />
    </div>
}