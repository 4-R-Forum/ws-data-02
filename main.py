def on_button_pressed_a():
    global tx_power
    if tx_power < 7:
        tx_power += 1
    basic.show_number(tx_power)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global tx_power
    if tx_power > 0:
        tx_power += -1
    basic.show_number(tx_power)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_logo_pressed():
    basic.show_string("010")
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

"""

Build 010

Desktop test 0420

"""
data_string = ""
tx_power = 0
period = 10000
period_p_hour = 3
tx_power = 7
radio.set_transmit_power(tx_power)
radio.set_group(1)
radio.set_frequency_band(0)
this_hour = 0
this_period = 0
# 12, less for test
period_p_hour = 3
# 24, less for test
hours_p_day = 3
weatherbit.start_weather_monitoring()
weatherbit.start_wind_monitoring()
weatherbit.start_rain_monitoring()

def on_every_interval():
    global data_string, this_period, this_hour
    # String for radio > X characters.
    data_string = "" + convert_to_text(Math.round(weatherbit.temperature() / 100)) + "," + convert_to_text(Math.round(weatherbit.humidity() / 1024)) + "," + convert_to_text(Math.idiv(weatherbit.pressure(), 25600)) + "," + convert_to_text(int(weatherbit.wind_speed())) + "," + weatherbit.wind_direction()
    basic.show_string("" + convert_to_text(this_hour) + "-" + convert_to_text(this_period))
    radio.send_string(data_string)
    this_period += 1
    if this_period > period_p_hour:
        data_string = convert_to_text(weatherbit.rain())
        radio.send_string(data_string)
        this_period = 0
        this_hour += 1
        if this_hour > hours_p_day:
            basic.show_string("Reset")
            control.reset()
loops.every_interval(period, on_every_interval)
