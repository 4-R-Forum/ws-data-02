/**
 * WS Transmit
 * 
 * Downoad to GOLD
 */
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
let data_string = ""
let tx_power = 0
let period = 300000
tx_power = 7
radio.setTransmitPower(tx_power)
radio.setGroup(1)
radio.setFrequencyBand(0)
weatherbit.startWeatherMonitoring()
weatherbit.startWindMonitoring()
weatherbit.startRainMonitoring()
loops.everyInterval(period, function () {
    data_string = "" + convertToText(Math.round(weatherbit.temperature() / 100)) + "," + convertToText(Math.round(weatherbit.humidity() / 1024)) + "," + convertToText(Math.idiv(weatherbit.pressure(), 696)) + "," + convertToText(weatherbit.windSpeed()) + "," + weatherbit.windDirection()
    radio.sendString(data_string)
    basic.showString(data_string)
    data_string = convertToText(weatherbit.rain())
    radio.sendString(data_string)
    basic.showString(data_string)
    basic.showString("Wait")
    basic.clearScreen()
})
