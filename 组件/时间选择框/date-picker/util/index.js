import moment from 'moment'
const presetRangeLabel = {
    yesterday: '昨日',
    today: '今日',
    lastWeek: '上周',
    thisWeek: '本周',
    lastMonth: '上月',
    thisMonth: '本月',
    lastYear: '去年',
    thisYear: '本年',
    lastSevenSays: '过去7天',
    lastThirtyDays: '过去30天'
}

export const defaultPresets = function () {
    return {
        yesterday: function () {
            const yesterday = new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.yesterday,
                active: false,
                dateRange: {
                    start: yesterday,
                    end: yesterday
                }
            }
        },
        today: function () {
            const today = new Date(moment().startOf('day').format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.today,
                active: false,
                dateRange: {
                    start: today,
                    end: today
                }
            }
        },
        lastWeek: function () {
            const startWeek = new Date(moment().startOf('isoWeek').subtract('week', 1).format('YYYY-MM-DD'))
            const endWeek = new Date(moment().endOf('isoWeek').subtract('week', 1).format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.lastWeek,
                active: false,
                dateRange: {
                    start: startWeek,
                    end: endWeek
                }
            }
        },
        thisWeek: function () {
            const startWeek = new Date(moment().startOf('isoWeek').format('YYYY-MM-DD'))
            const endWeek = new Date(moment().format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.thisWeek,
                active: false,
                dateRange: {
                    start: startWeek,
                    end: endWeek
                }
            }
        },
        lastMonth: function () {
            const startMonth = new Date(moment().startOf('month').subtract('month', 1).format('YYYY-MM-DD'))
            const endMonth = new Date(moment().endOf('month').subtract('month', 1).format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.lastMonth,
                active: false,
                dateRange: {
                    start: startMonth,
                    end: endMonth
                }
            }
        },
        thisMonth: function () {
            const startMonth = new Date(moment().startOf('month').format('YYYY-MM-DD'))
            const endMonth = new Date(moment().format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.thisMonth,
                active: false,
                dateRange: {
                    start: startMonth,
                    end: endMonth
                }
            }
        },
        lastYear: function () {
            const startYear = new Date(moment().startOf('year').subtract('year', 1).format('YYYY-MM-DD'))
            const endYear = new Date(moment().endOf('year').format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.lastYear,
                active: false,
                dateRange: {
                    start: startYear,
                    end: endYear
                }
            }
        },
        thisYear: function () {
            const startYear = new Date(moment().startOf('year').format('YYYY-MM-DD'))
            const endYear = new Date(moment().format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.thisYear,
                active: false,
                dateRange: {
                    start: startYear,
                    end: endYear
                }
            }
        },
        lastSevenSays: function () {
            const start = new Date(moment().subtract(7, 'days').format('YYYY-MM-DD'))
            const end = new Date(moment().format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.lastSevenSays,
                active: false,
                dateRange: {
                    start: start,
                    end: end
                }
            }
        },
        lastThirtyDays: function () {
            const start = new Date(moment().subtract(30, 'days').format('YYYY-MM-DD'))
            const end = new Date(moment().format('YYYY-MM-DD'))
            return {
                label: presetRangeLabel.lastThirtyDays,
                active: false,
                dateRange: {
                    start: start,
                    end: end
                }
            }
        }
    }
}
