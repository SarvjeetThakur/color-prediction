
declare type GetIncreaseAmount = (walletAmount: number, contractMoney: number, color: string, isNumberWin: boolean, winingNumber: number) => number;

const WIN_WITH_NUMBER_PERCENTAGE = 9;
const COLOR_WIN_PERCENTAGE = 2;
const MIX_COLOR_WIN = 4.5;
const OTHER_WIN_PERCENTAGE = 1.5;

const getIncreaseAmount: GetIncreaseAmount = (walletAmount, contractMoney, color, isNumberWin, winingNumber) => {
    if (isNumberWin) {
        return ((walletAmount + (contractMoney * WIN_WITH_NUMBER_PERCENTAGE)));
    };
    const winPercentage = {
        green: winingNumber === 5 ? OTHER_WIN_PERCENTAGE : COLOR_WIN_PERCENTAGE,
        red: winingNumber === 0 ? OTHER_WIN_PERCENTAGE : COLOR_WIN_PERCENTAGE,
        'violet-red': MIX_COLOR_WIN,
        'violet-green': MIX_COLOR_WIN,
        violet:MIX_COLOR_WIN,
    };
    return ((walletAmount + (contractMoney * winPercentage[color])));
};


export {
    getIncreaseAmount
}