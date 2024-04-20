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
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // Desktop Test 0420
    basic.showString("011")
})
let data_string = ""
let tx_power = 0
let period = 10000
let period_p_hour = 3
tx_power = 7
radio.setTransmitPower(tx_power)
radio.setGroup(1)
radio.setFrequencyBand(0)
let this_hour = 0
let this_period = 0
// 12, less for test
period_p_hour = 3
// 24, less for test
let hours_p_day = 3
weatherbit.startWeatherMonitoring()
weatherbit.startWindMonitoring()
weatherbit.startRainMonitoring()
loops.everyInterval(period, function () {
    // String for radio > X characters.
    data_string = "" + convertToText(Math.round(weatherbit.temperature() / 100)) + "," + convertToText(Math.round(weatherbit.humidity() / 1024)) + "," + convertToText(Math.idiv(weatherbit.pressure(), 25600)) + "," + convertToText(Math.trunc(weatherbit.windSpeed())) + "," + weatherbit.windDirection()
    basic.showString("" + convertToText(this_hour) + "-" + convertToText(this_period))
    radio.sendString(data_string)
    this_period += 1
    if (this_period > period_p_hour) {
        data_string = convertToText(weatherbit.rain())
        radio.sendString(data_string)
        this_period = 0
        this_hour += 1
        if (this_hour > hours_p_day) {
            basic.showString("Reset")
            control.reset()
        }
    }
})
