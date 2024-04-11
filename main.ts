input.onButtonPressed(Button.A, function () {
    if (tx_power < 7) {
        tx_power += 1
    }
    basic.showNumber(tx_power)
})
input.onButtonPressed(Button.B, function () {
    if (tx_power > 0) {
        tx_power += -1
    }
    basic.showNumber(tx_power)
})
/**
 * WS Transmit
 * 
 * Downoad to GOLD
 */
let data_string = ""
let tx_power = 0
let period = 60000
let p_per_day = 2
tx_power = 7
radio.setTransmitPower(tx_power)
radio.setGroup(1)
radio.setFrequencyBand(0)
let this_period = 0
weatherbit.startWeatherMonitoring()
weatherbit.startWindMonitoring()
weatherbit.startRainMonitoring()
loops.everyInterval(period, function () {
    data_string = "" + convertToText(Math.round(weatherbit.temperature() / 100)) + "," + convertToText(Math.round(weatherbit.humidity() / 1024)) + "," + convertToText(Math.idiv(weatherbit.pressure(), 25600)) + "," + convertToText(Math.trunc(weatherbit.windSpeed())) + "," + weatherbit.windDirection()
    radio.sendString(data_string)
    basic.showString(data_string)
    this_period += 1
    if (this_period == p_per_day) {
        data_string = convertToText(weatherbit.rain())
        radio.sendString(data_string)
        basic.showString(data_string)
        basic.showString("Wait")
        basic.clearScreen()
        this_period = 0
    }
})
