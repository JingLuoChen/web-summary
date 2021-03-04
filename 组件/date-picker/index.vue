<template>
    <div v-click-outside.capture="onClickOutside" class="kp-date-picker">
        <div class="kp-select-selection" @click="toggleMenu" @mouseenter="hasMouseHoverHead = true" @mouseleave="hasMouseHoverHead = false">
            <Input :value="range" :placeholder="placeholder" :readonly="readonly" :style="{width: width + 'px'}">
                <Icon v-if="resetSelect" slot="suffix" type="ios-close-circle" @click.native.stop="onClear"></Icon>
                <Icon v-if="!resetSelect" slot="suffix" type="ios-calendar-outline" />
            </Input>
        </div>
        <transition name="transition-drop">
            <div v-show="visible" ref="menu" class="kp-date-picker-menu" :style="{left: leftValue + 'px'}">
                <div class="title">
                    <div :class="{'selected': timeType === 1}" @click="changeTimeType(1)">动态时间</div>
                    <div :class="{'selected': timeType === 0}" @click="changeTimeType(0)">静态时间</div>
                    <div class="real-time">{{ realTime }}</div>
                </div>
                <div class="calendar-wrap">
                    <div class="ranges">
                        <ul>
                            <li
                                    v-for="(item, index) in finalPresetRanges"
                                    :key="index"
                                    :class="{'active': presetActive === item.label}"
                                    @click="updatePreset(item)"
                            >{{ item.label }}</li>
                        </ul>
                    </div>
                    <div class="date-picker-left">
                        <div class="date-panel">
                            <!-- 顶部按钮及年月显示条 -->
                            <div class="top-bar">
                <span class="prev" @click="left">
                  <Icon type="ios-arrow-back" />
                </span>
                                <span class="year" @click="panelType = 'year'">{{ activeYearStart }}年</span>
                                <span class="month" @click="panelType = 'month'">{{ monthList[activeMonthStart].label }}</span>
                                <span class="next" @click="right">
                  <Icon type="ios-arrow-forward" />
                </span>
                            </div>
                            <!-- 年面板 -->
                            <div v-show="panelType === 'year'" class="type-year">
                                <ul class="year-list">
                                    <li v-for="(item, index) in yearList"
                                        :key="index"
                                        @click="selectYear(item)"
                                    >
                                        <span :class="{selected: item === activeYearStart}" >{{ item }}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- 月面板 -->
                            <div v-show="panelType === 'month'" class="type-year">
                                <ul class="year-list">
                                    <li v-for="(item, index) in monthList"
                                        :key="index"
                                        @click="selectMonth(item)"
                                    >
                                        <span :class="{selected: item.value === activeMonthStart}" >{{ item.label }}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- 日期面板 -->
                            <div v-show="panelType === 'date'" class="date-group">
                                <span v-for="(item, index) in weekList" :key="index" class="weekday">{{ item.label }}</span>
                                <ul class="date-list">
                                    <li v-for="(item, index) in dateList"
                                        :key="index"
                                        :class="getClasses(item, 'first', startMonthDay, endMonthDate)"
                                        @click="selectDate($event, item, 'first')"
                                        @mousemove="handleMouseMove($event, item)"
                                        @mouseleave="handleMouseLeave"
                                        v-text="item.value">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="date-picker-right">
                        <div class="date-panel">
                            <!-- 顶部按钮及年月显示条 -->
                            <div class="top-bar">
                <span class="prev" @click="left">
                  <Icon type="ios-arrow-back" />
                </span>
                                <span class="year" @click="panelType = 'year'">{{ activeYearEnd }}年</span>
                                <span class="month" @click="panelType = 'month'">{{ monthList[startNextActiveMonth].label }}</span>
                                <span class="next" @click="right">
                  <Icon type="ios-arrow-forward" />
                </span>
                            </div>
                            <!-- 年面板 -->
                            <div v-show="panelType === 'year'" class="type-year">
                                <ul class="year-list">
                                    <li v-for="(item, index) in yearList"
                                        :key="index"
                                        @click="selectYear(item)"
                                    >
                                        <span :class="{selected: item === activeYearStart}" >{{ item }}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- 月面板 -->
                            <div v-show="panelType === 'month'" class="type-year">
                                <ul class="year-list">
                                    <li v-for="(item, index) in monthList"
                                        :key="index"
                                        @click="selectMonth(item)"
                                    >
                                        <span :class="{selected: item.value === activeMonthStart}" >{{ item.label }}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- 日期面板 -->
                            <div v-show="panelType === 'date'" class="date-group">
                                <span v-for="(item, index) in weekList" :key="index" class="weekday">{{ item.label }}</span>
                                <ul class="date-list">
                                    <li v-for="(item, index) in dateListSecond"
                                        :key="index"
                                        :class="getClasses(item, 'second', startNextMonthDay, endNextMonthDate)"
                                        @click="selectDate($event, item, 'second')"
                                        @mousemove="handleMouseMove($event, item)"
                                        @mouseleave="handleMouseLeave"
                                        v-text="item.value">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="toolbar">
                    <Button type="text" @click="visible = false">取消</Button>
                    <Button type="primary" @click="setDateValue">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    /*
    * value：日期，数组
    *
    * placeholder：占位文本
    *
    * clearable：是否显示清楚按钮
    *
    * type：是否是静态时间/动态时间 0：静态时间 1：动态时间
    *
    * pickerOptions：快捷功能配置 disabledDate为禁用日期 limitDate为时间范围限制
    *
    *
    * pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < new Date('2017-12-31').getTime()
        },
        limitDate(time) {
          const timeRange = new Date(time[1]).getTime() - new Date(time[0]).getTime()
          const oneMothDays = 1000 * 3600 * 24 * 30 // 此处设置时间范围不能超过一个月
          if (timeRange > oneMothDays) {
            return {
              state: false,
              message: '查询时间范围请选择一个月以内'
            }
          }
          return {
            state: true
          }
        }
      },
    *
    * */
    import {defaultPresets, getPresetsDate} from './util/index'
    import {hasClass, addClass, removeClass} from './util/dom'
    import {directive as clickOutside} from 'v-click-outside-x'
    import moment from 'moment'
    export default {
        name: 'KpDatePicker',
        directives: {
            clickOutside
        },
        props: {
            width: {
                type: Number,
                default: 250
            },
            value: {
                type: Array,
                default: []
            },
            placeholder: {
                type: String,
                default: '选择时间范围'
            },
            clearable: {
                type: Boolean,
                default: false
            },
            type: {
                type: Number,
                default: 0
            },
            pickerOptions: {},
            startActiveMonth: {
                type: Number,
                default: new Date().getMonth()
            },
            startActiveYear: {
                type: Number,
                default: new Date().getFullYear()
            },
        },
        data() {
            return {
                timeType: this.type,
                presetActive: '',
                range: '', // input显示数据
                realTime: '', // 静态/动态时间
                selected: '',
                readonly: true,
                selectedValue: '',
                hasMouseHoverHead: false,
                visible: false,
                dateValue: '', // 输入框显示日期
                now: new Date(),
                month: new Date().getMonth(),
                weekList: [
                    {label: '日', value: 0},
                    {label: '一', value: 1},
                    {label: '二', value: 2},
                    {label: '三', value: 3},
                    {label: '四', value: 4},
                    {label: '五', value: 5},
                    {label: '六', value: 6}
                ], // 周
                monthList: [
                    {label: '1月', value: 0},
                    {label: '2月', value: 1},
                    {label: '3月', value: 2},
                    {label: '4月', value: 3},
                    {label: '5月', value: 4},
                    {label: '6月', value: 5},
                    {label: '7月', value: 6},
                    {label: '8月', value: 7},
                    {label: '9月', value: 8},
                    {label: '10月', value: 9},
                    {label: '11月', value: 10},
                    {label: '12月', value: 11}
                ], // 月
                panelType: 'date', // 面板状态
                isFirstChoice: true, // 是否选中
                dateRange: {}, // 时间范围
                activeMonthStart: this.startActiveMonth,
                activeYearStart: this.startActiveYear,
                activeYearEnd: this.startActiveYear,
                leftValue: 0,
            }
        },
        computed: {
            dateList() {
                // 获取当月的天数
                let currentMonthLength = new Date(
                    this.activeYearStart,
                    this.activeMonthStart + 1,
                    0
                ).getDate()
                // 先将当月的日期塞入dateList
                let dateList = Array.from(
                    { length: currentMonthLength },
                    (val, index) => {
                        return {
                            year: this.activeYearStart,
                            month: this.activeMonthStart + 1,
                            currentMonth: true,
                            value: index + 1
                        }
                    }
                )
                // 获取当月1号的星期是为了确定在1号前需要插多少天
                let startDay = new Date(this.activeYearStart, this.activeMonthStart, 1).getDay()
                let previousMonth = this.activeMonthStart
                let previousYear = this.activeYearStart
                if (previousMonth === 0) {
                    previousMonth = 12
                    previousYear = previousYear - 1
                }
                // 确认上个月一共多少天
                let previousMongthLength = new Date(
                    this.activeYearStart,
                    this.activeMonthStart,
                    0
                ).getDate()
                // 在1号前插入上个月日期
                for (let i = 0, len = startDay; i < len; i++) {
                    dateList = [
                        {
                            year: previousYear,
                            month: previousMonth,
                            previousMonth: true,
                            value: previousMongthLength - i
                        }
                    ].concat(dateList)
                }
                // // 补全剩余位置,至少14天，则 i < 15
                // for (let i = 1, item = 1; i < 15; i++, item++) {
                //   dateList[dateList.length] = { nextMonth: true, value: i }
                // }
                return dateList
            },
            dateListSecond() {
                // 获取当月的天数
                let currentMonthLength = new Date(
                    this.activeYearStart,
                    this.startNextActiveMonth + 1,
                    0
                ).getDate()
                // 先将当月的日期塞入dateList
                let dateList = Array.from(
                    { length: currentMonthLength },
                    (val, index) => {
                        return {
                            year: this.activeYearStart,
                            month: this.startNextActiveMonth + 1,
                            currentMonth: true,
                            value: index + 1
                        }
                    }
                )
                // 获取当月1号的星期是为了确定在1号前需要插多少天
                let startDay = new Date(this.activeYearStart, this.startNextActiveMonth + 1, 1).getDay()
                let previousMonth = this.startNextActiveMonth
                let previousYear = this.activeYearStart
                if (previousMonth === 0) {
                    previousMonth = 12
                    previousYear = previousYear - 1
                }
                // 确认上个月一共多少天
                let previousMongthLength = new Date(
                    this.activeYearStart,
                    this.activeMonthStart + 1,
                    0
                ).getDate()
                // 在1号前插入上个月日期
                for (let i = 0, len = startDay; i < len; i++) {
                    dateList = [
                        {
                            year: previousYear,
                            month: previousMonth,
                            previousMonth: true,
                            value: previousMongthLength - i
                        }
                    ].concat(dateList)
                }
                // // 补全剩余位置,至少14天，则 i < 15
                // for (let i = 1, item = 1; i < 15; i++, item++) {
                //   dateList[dateList.length] = { nextMonth: true, value: i }
                // }
                return dateList
            },
            // 预设时间快捷数组
            finalPresetRanges() {
                const tmp = {}
                const presets = defaultPresets()
                for (const i in presets) {
                    const item = presets[i]
                    let plainItem = item
                    if (typeof item === 'function') {
                        plainItem = item()
                    }
                    tmp[i] = plainItem
                }
                return tmp
            },
            // 通过改变this.activeYearStart则可以改变年份数组
            yearList() {
                return Array.from({ length: 12 }, (value, index) => this.activeYearStart + index)
            },
            // 是否显示clear
            resetSelect(){
                return !this.showPlaceholder && this.hasMouseHoverHead && this.clearable
            },
            showPlaceholder () {
                let status = false
                const value = this.selected
                if (typeof value === 'undefined' || String(value).trim() === '') {
                    status = true
                }
                return status
            },
            startNextActiveMonth: function () {
                return this.activeMonthStart >= 11 ? 0 : this.activeMonthStart + 1
            },
            startMonthDay: function () {
                return new Date(moment([this.activeYearStart, this.activeMonthStart, 1]).format('YYYY-MM-DD')).getDay()
            },
            endMonthDate: function () {
                return new Date(moment([this.activeYearEnd, this.startNextActiveMonth, 0]).format('YYYY-MM-DD')).getDate()
            },
            startNextMonthDay: function () {
                return new Date(moment([this.activeYearStart, this.startNextActiveMonth, 1]).format('YYYY-MM-DD')).getDay()
            },
            endNextMonthDate: function () {
                return new Date(moment([this.activeYearEnd, this.activeMonthStart + 2, 0]).format('YYYY-MM-DD')).getDate()
            },
        },
        watch: {
            value(e) {
                this.timeType = this.type
                this.getDateRange(e)
            },
            timeType(e) {
                this.getRealTime(this.dateRange, e)
            },
            dateRange(e) {
                this.getRealTime(e, this.timeType)
            },
            startNextActiveMonth: function (value) {
                if (value === 0) {
                    this.activeYearEnd = this.activeYearStart + 1
                }
            },
            visible(e) {
                if (e) {
                    this.getLeft()
                }
            }
        },
        mounted() {
            this.getDateRange(this.value)
        },
        methods: {
            getLeft() {
                this.$nextTick(() => {
                    const {left, width} = this.$refs.menu.getBoundingClientRect()
                    this.leftValue = left > width ? '-403' : '0'
                })
            },
            // 获取动态时间
            getDynamicText(dataRange) {
                const presetsDate = getPresetsDate()
                for (let item in presetsDate) {
                    let range = this.getPresetsTimeValue(presetsDate[item].value)
                    if (this.isArrayEqual(range, dataRange)) {
                        this.presetActive = presetsDate[item].label
                        return true
                    }
                }
                return false
            },
            // 时间日期格式转换
            getPresetsTimeValue(timeRange) {
                return [new Date(timeRange[0]).getTime(), new Date(timeRange[1]).getTime()]
            },
            isArrayEqual(listA, listB) {
                return listA.length === listB.length && listA.every(a => listB.some(b => a === b)) && listB.every(_b => listA.some(_a => _a === _b))
            },
            // 获取选中的时间范围
            getDateRange(e) {
                if (e.length !== 0) {
                    this.dateRange.start = new Date(e[0])
                    this.dateRange.end = new Date(e[1])
                    this.getRealTime(this.dateRange, this.timeType)
                    this.range = this.getRangeText(this.dateRange)
                } else {
                    this.range = ''
                }
            },
            // 获取动态/静态时间
            getRealTime(range, timeType) {
                if (range.start && range.end) {
                    let timeArr = this.getPresetsTimeValue([range.start, range.end])
                    if (timeType === 0) {
                        let start = range.start ? moment(new Date(range.start).getTime()).format('YYYY-MM-DD') : ''
                        let end = range.end ? moment(new Date(range.end).getTime()).format('YYYY-MM-DD') : ''
                        this.realTime = `${start} - ${end}`
                    } else {
                        let start = range.start ? moment(moment()).diff(new Date(range.start).getTime(), 'day') : ''
                        let end = range.end ? moment(moment()).diff(new Date(range.end).getTime(), 'day') : ''
                        if (this.getDynamicText(timeArr)) {
                            this.realTime = this.presetActive
                        } else {
                            if (start === 0) {
                                this.realTime = '今日'
                            } else {
                                if (end === 0) {
                                    this.realTime = start === 0 ? '今日' : `最近${start+1}天`
                                } else  if (end === 1){
                                    this.realTime = `过去${start}天`
                                } else {
                                    this.realTime = `过去${start}天 - 过去${end}天`
                                }
                            }
                        }
                    }
                }
            },
            // 获取显示的时间
            getRangeText(dateRange) {
                return `${moment(new Date(dateRange.start).getTime()).format('YYYY-MM-DD')} - ${moment(new Date(dateRange.end).getTime()).format('YYYY-MM-DD')}`
            },
            // 获取日期样式值
            getClasses(item, key, startMonthDay, endMonthDate) {
                return {
                    'preMonth': item.previousMonth,
                    'today': this.isToday(item, key, startMonthDay, endMonthDate),
                    'selected': this.isDateSelected(item, key, startMonthDay, endMonthDate),
                    'in-range': this.isDateInRange(item, key, startMonthDay, endMonthDate),
                    'disabled': this.isDateDisabled(item, key, startMonthDay, endMonthDate)
                }
            },
            // 判断是否是今天
            isToday(item) {
                if (item.previousMonth) {
                    return false
                }
                const now = new Date(moment([new Date().getFullYear(), new Date().getMonth(), new Date().getDate()]).format('YYYY-MM-DD'))
                let currDate = new Date(moment([item.year, item.month - 1, item.value]).format('YYYY-MM-DD'))
                return (now.getTime() === currDate.getTime())
            },
            // 判断是否可点击
            isDateDisabled (item) {
                const result = new Date(moment([item.year, item.month - 1, item.value]).format('YYYY-MM-DD'))
                let disabledDate = this.pickerOptions.disabledDate
                return typeof disabledDate === 'function' && disabledDate(result)
            },
            // 判断是否已经选中
            isDateSelected(item, key, startMonthDay, endMonthDate) {
                if (item.previousMonth) {
                    return false
                }
                const result = item.value
                if (result < 0 || result > endMonthDate) {
                    return false
                }
                let currDate = null
                if (key === 'first') {
                    currDate = new Date(moment([this.activeYearStart, this.activeMonthStart, result]).format('YYYY-MM-DD'))
                } else {
                    currDate = new Date(moment([this.activeYearEnd, this.startNextActiveMonth, result]).format('YYYY-MM-DD'))
                }
                return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
                    (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime())
            },
            // 判断是否是在时间范围内
            isDateInRange(item, key, startMonthDay, endMonthDate) {
                if (item.previousMonth) {
                    return false
                }
                const result = item.value
                if (result < 1 || result > endMonthDate) {
                    return false
                }
                let currDate = null
                if (key === 'first') {
                    currDate = new Date(moment([this.activeYearStart, this.activeMonthStart, result]).format('YYYY-MM-DD'))
                } else {
                    currDate = new Date(moment([this.activeYearEnd, this.startNextActiveMonth, result]).format('YYYY-MM-DD'))
                }
                return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
                    (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime())
            },
            // 切换动态/静态时间
            changeTimeType(value) {
                this.timeType = value
            },
            // 设置快捷时间
            updatePreset(item) {
                this.presetActive = item.label
                this.dateRange = item.dateRange
                this.activeMonthStart = this.dateRange.start.getMonth()
                this.activeYearStart = this.dateRange.start.getFullYear()
                this.activeYearEnd = this.dateRange.end.getFullYear()
            },
            // 关闭下拉框
            hideMenu () {
                this.toggleMenu(null, false)
            },
            // 监听select外的事件
            onClickOutside(event) {
                if (this.visible) {
                    if (event.type === 'mousedown') {
                        event.preventDefault()
                        return
                    }
                    event.preventDefault()
                    this.hideMenu()
                }
            },
            toggleMenu (e, force) {
                this.presetActive = ''
                this.getDateRange(this.value)
                this.visible = typeof force !== 'undefined' ? force : !this.visible
            },
            // 清空数据
            onClear() {
                this.hideMenu()
                if (this.clearable) this.reset()
            },
            reset(){
                this.selected = ''
                this.selectedValue = ''
                this.$emit('input', this.selectedValue)
                this.$emit('on-change', this.selectedValue)
            },
            // 左切换时间
            left() {
                const prevMonth = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0))
                this.activeMonthStart = prevMonth.getMonth()
                this.activeYearStart = prevMonth.getFullYear()
                this.activeYearEnd = prevMonth.getFullYear()
            },
            // 右切换时间
            right() {
                const nextMonth = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 1))
                this.activeMonthStart = nextMonth.getMonth()
                this.activeYearStart = nextMonth.getFullYear()
                this.activeYearEnd = nextMonth.getFullYear()
            },
            // 获取新的时间范围
            getNewDateRange (result, activeMonth, activeYear) {
                if (this.dateRange.start && this.dateRange.end) {
                    this.isFirstChoice = true
                }
                const newData = {}
                let key = 'start'
                if (!this.isFirstChoice) {
                    key = 'end'
                } else {
                    newData['end'] = null
                }
                const resultDate = new Date(moment([activeYear, activeMonth, result]).format('YYYY-MM-DD'))
                if (!this.isFirstChoice && this.dateRange.end) {
                    this.isFirstChoice = false
                    return { start: resultDate }
                }
                this.isFirstChoice = !this.isFirstChoice
                newData[key] = resultDate
                return newData
            },
            // 选中时间
            selectDate(event, item, type) {
                let target = event.target
                if (item.previousMonth) {
                    return false
                }
                if (hasClass(target, 'disabled')) {
                    return
                }
                this.presetActive = ''
                const result = item.value
                if (type === 'first') {
                    this.dateRange = this.adjustDateRange({...this.dateRange, ...this.getNewDateRange(result, this.activeMonthStart, this.activeYearStart)})
                } else {
                    this.dateRange = this.adjustDateRange({...this.dateRange, ...this.getNewDateRange(result, this.startNextActiveMonth, this.activeYearEnd)})
                }
            },
            // 调整时间范围的顺序，保证小日期在前，大日期在后
            adjustDateRange(obj) {
                let start = new Date(obj.start).getTime()
                let end = new Date(obj.end).getTime()
                if (start <= end) {
                    return {
                        start: obj.start,
                        end: obj.end
                    }
                } else {
                    return {
                        start: obj.end,
                        end: obj.start
                    }
                }
            },
            // 鼠标浮动效果handleMouseMove
            handleMouseMove(event, item) {
                if (item.previousMonth) {
                    return false
                }
                let target = event.target
                if (hasClass(target, 'disabled')) {
                    return
                }
                addClass(target, 'hover')
            },
            // 鼠标移出效果
            handleMouseLeave(event) {
                let target = event.target
                removeClass(target, 'hover')
            },
            // 判断数据是否正确
            judgmentDateValue(dateRange) {
                if (!dateRange.start && !dateRange.end) {
                    return false
                }
                if (!dateRange.start) {
                    this.dateRange.start = this.dateRange.end
                }
                if (!dateRange.end) {
                    this.dateRange.end = this.dateRange.start
                }
                return true
            },
            // 时间确定事件
            setDateValue() {
                let limitDate = this.pickerOptions.limitDate
                if (typeof limitDate === 'function' && !limitDate([this.dateRange.start, this.dateRange.end]).state) {
                    this.$Message.warning(limitDate([this.dateRange.start, this.dateRange.end]).message)
                    return false
                }
                if (!this.judgmentDateValue(this.dateRange)) {
                    return false
                }
                this.range = this.getRangeText(this.dateRange)
                this.visible = false
                this.$emit('input', [moment(new Date(this.dateRange.start).getTime()).format('YYYY-MM-DD'), moment(new Date(this.dateRange.end).getTime()).format('YYYY-MM-DD')]) // to update v-model
                this.$emit('on-change', [moment(new Date(this.dateRange.start).getTime()).format('YYYY-MM-DD'), moment(new Date(this.dateRange.end).getTime()).format('YYYY-MM-DD')])
                this.$emit('get-data', {
                    timeType: this.timeType,
                    realTime: this.realTime
                })
            },
            // 切换年
            selectYear(item) {
                this.activeYearStart = item
                this.panelType = 'month'
            },
            // 切换月
            selectMonth(item) {
                this.activeMonthStart = item.value
                this.panelType = 'date'
            }
        }
    }
</script>

<style>
    .kp-select-selection input {
        cursor: pointer !important;
    }
    .kp-select-input .ivu-input {
        border: 0 solid #dcdee2;
    }
    .kp-select-input .ivu-input:focus {
        outline: none;
        border: none;
        box-shadow: 0 0 0 2px transparent;
    }
</style>

<style scoped lang="less">
    .kp-date-picker {
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        color: #515a6e;
        font-size: 14px;
        line-height: normal;
        position: relative;
        .kp-date-picker-menu {
            position: absolute;
            background: #fff;
            width: 654px;
            height: 356px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
            z-index: 3000;
            padding: 12px 10px 10px;
            font-size: 13px;
            border-radius: 4px;
            .title {
                color: #757575;
                font-size: 0;
                border-bottom: 1px solid #eeeff5;
                margin-bottom: 8px;
                div {
                    display: inline-block;
                    text-align: center;
                    padding: 5px 5px 8px;
                    margin-bottom: -1px;
                    cursor: pointer;
                    color: #535d68;
                    font-size: 14px;
                    font-weight: 700;
                    box-sizing: border-box;
                }
                div:nth-child(1) {
                    width: 15%;
                }
                div:nth-child(2) {
                    width: 15%;
                }
                div:nth-child(3) {
                    width: 70%;
                    text-align: right;
                }
                .real-time {
                    color: #757575;
                }
                .selected {
                    color: #2dca93;
                    border-bottom: 2px solid #2dca93;
                }
            }
            .calendar-wrap {
                overflow: hidden;
                border: 1px solid #fff;
                border-radius: 4px;
                width: 632px;
                .ranges {
                    float: left;
                    width: 152px;
                    margin: 0 4px 4px;
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        li {
                            background: #f5f5f5;
                            border: 1px solid #f5f5f5;
                            font-size: 13px;
                            display: inline-block;
                            margin: 4px 3px;
                            text-align: center;
                            color: #559ff0;
                            border-radius: 2px;
                            transition: background 0.2s;
                            width: 70px;
                            height: 34px;
                            line-height: 34px;
                            cursor: pointer;
                            box-sizing: border-box;
                        }
                        li:nth-last-child(2),
                        li:nth-last-child(1) {
                            width: 146px;
                        }
                        li:hover {
                            background: #559ff0;
                            color: #fff;
                            border: 1px solid transparent;
                        }
                        .active {
                            background: #559ff0;
                            color: #fff;
                            border: 1px solid transparent;
                        }
                    }
                }
                .date-picker-left,
                .date-picker-right {
                    float: left;
                    width: 224px;
                    margin: 4px;
                    text-align: center;
                    font-family: "Avenir", Helvetica, Arial, sans-serif;
                    .date-panel {
                        width: 224px;
                        border: 1px solid #ddd;
                        padding: 4px;
                        border-radius: 4px;
                        background: #fff;
                        .top-bar {
                            height: 34px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }
                        .top-bar span {
                            display: inline-block;
                            width: 20px;
                            height: 30px;
                            line-height: 30px;
                            color: #515a6e;
                            cursor: pointer;
                        }
                        .top-bar span:hover {
                            color: #2d8cf0;
                        }
                        .top-bar .prev,
                        .top-bar .next {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 50px;
                            font-style: normal;
                            font-weight: 400;
                            font-variant: normal;
                            text-transform: none;
                            line-height: 1;
                            font-size: 20px;
                        }
                        .top-bar .year,
                        .top-bar .month {
                            width: 50px;
                        }
                        .year-list {
                            height: 200px;
                            width: 224px;
                        }
                        .year-list .selected {
                            background: #2d8cf0;
                            border-radius: 4px;
                            color: #fff;
                        }
                        .year-list .today {
                            background: #2d8cf0;
                            border-radius: 4px;
                            color: #fff;
                        }
                        .year-list li {
                            display: inline-block;
                            width: 70px;
                            height: 50px;
                            line-height: 50px;
                            border-radius: 10px;
                            cursor: pointer;
                        }
                        .year-list span {
                            display: inline-block;
                            line-height: 16px;
                            padding: 8px;
                        }
                        .year-list span:hover {
                            background: #e1f0fe;
                        }
                        .weekday {
                            display: inline-block;
                            font-size: 13px;
                            width: 30px;
                            color: #c5c8ce;
                            text-align: center;
                        }
                        ul {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                        }
                        .date-list {
                            width: 214px;
                            text-align: left;
                            height: 180px;
                            overflow: hidden;
                            margin-top: 4px;
                        }
                        .date-list li {
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            cursor: pointer;
                            color: #000;
                            border: 1px solid #fff;
                            border-radius: 4px;
                        }
                        .date-list .disabled {
                            background-color: #f5f7fa;
                            opacity: 1;
                            cursor: not-allowed;
                            color: #c0c4cc;
                        }
                        .date-list .start-date,
                        .date-list .end-date {
                            background-color: #559ff0;
                        }
                        .date-list .in-range {
                            background-color: rgba(74, 144, 226, 0.6);
                            border-bottom: 1px solid #fff;
                            color: #fff;
                        }
                        .date-list .selected {
                            background-color: #559ff0;
                            border-bottom: 1px solid #fff;
                            border-right: 1px solid #fff;
                            color: #fff;
                        }
                        .date-list .today {
                            border: 1px solid #2d8cf0;
                        }
                        .date-list .invalid {
                            background: #2d8cf0;
                            color: #fff;
                        }
                        .date-list .preMonth,
                        .date-list .nextMonth {
                            color: #c5c8ce;
                        }
                        .date-list .hover {
                            background: #559ff0;
                        }
                        .fadeDownBig-enter-active,
                        .fadeDownBig-leave-active,
                        .fadeInDownBig {
                            -webkit-animation-duration: 0.5s;
                            animation-duration: 0.5s;
                            -webkit-animation-fill-mode: both;
                            animation-fill-mode: both;
                        }
                        .fadeDownBig-enter-active {
                            -webkit-animation-name: fadeInDownBig;
                            animation-name: fadeInDownBig;
                        }
                        .fadeDownBig-leave-active {
                            -webkit-animation-name: fadeOutDownBig;
                            animation-name: fadeOutDownBig;
                        }

                        @-webkit-keyframes fadeInDownBig {
                            from {
                                opacity: 0.8;
                                -webkit-transform: translate3d(0, -4px, 0);
                                transform: translate3d(0, -4px, 0);
                            }
                            to {
                                opacity: 1;
                                -webkit-transform: none;
                                transform: none;
                            }
                        }

                        @keyframes fadeInDownBig {
                            from {
                                opacity: 0.8;
                                -webkit-transform: translate3d(0, -4px, 0);
                                transform: translate3d(0, -4px, 0);
                            }
                            to {
                                opacity: 1;
                                -webkit-transform: none;
                                transform: none;
                            }
                        }

                        @-webkit-keyframes fadeOutDownBig {
                            from {
                                opacity: 1;
                            }
                            to {
                                opacity: 0.8;
                                -webkit-transform: translate3d(0, -4px, 0);
                                transform: translate3d(0, -4px, 0);
                            }
                        }

                        @keyframes fadeOutDownBig {
                            from {
                                opacity: 1;
                            }
                            to {
                                opacity: 0;
                            }
                        }
                    }
                }
            }
            .toolbar {
                clear: both;
                text-align: right;
                margin-right: 10px;
            }
        }
    }
</style>

