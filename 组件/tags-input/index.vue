<template>
    <div class="kp-tags-input">
        <div v-for="(item, index) in dis_source" :key="index" class="tags tags-item" transition="tags">
            <span class="content">{{ item }}</span><span class="del" @click="del(index)">&times;</span>
        </div>
        <div v-click-outside.capture="onClickOutside" class="kp-tags-input-box">
            <div style="height: 30px;">
                <Input ref="input" v-model="inputValue" type="text" :placeholder="placeholder"
                       @on-enter="add(inputValue)" @keydown.delete.native="del(dis_source.length - 1)" @on-focus="getFocus"
                       @on-blur="getBlur">
                </Input>
            </div>
            <transition name="transition-drop">
                <div v-show="visible" class="kp-tags-input-content">
                    <div class="kp-tags-input-dropdown">
                        <ul class="kp-tags-input-dropdown-list">
                            <li v-for="(item, index) in optionList" :key="index" @click.stop="select(item)" @mousedown.prevent>{{ item.showValue }}</li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x'
    export default {
        name: 'TagsInput',
        directives: {
            clickOutside
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default: []
            },
            placeholder: {
                type: String,
                default: '按 enter 添加'
            }
        },
        data() {
            return {
                inputValue: '',
                dis_source: [],
                visible: false,
                optionList: [],
                cacheList: []
            }
        },
        watch: {
            data() {
                this.initData()
            },
            inputValue(e) {
                this.optionList = this.cacheList.filter(item => item.value.indexOf(e) !== -1)
            },
            dis_source(e) {
                this.optionList = this.cacheList.filter(item => e.indexOf(item.value) < 0)
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            // 初始化
            initData() {
                this.dis_source = this.value ? this.value.split(',') : []
                this.optionList = this.data.filter(item => this.dis_source.indexOf(item) < 0)
                this.cacheList = this.data
            },
            // dis_source push value
            addDisSource(inputValue) {
                let arr = inputValue.split(',')
                if (Array.isArray(arr) && arr.length !== 0) {
                    arr.forEach(arrKay => {
                        if (!this.dis_source.find(item => item === arrKay)) {
                            this.dis_source.push(arrKay)
                        }
                    })
                } else {
                    if (!this.dis_source.find(item => item === inputValue)) {
                        this.dis_source.push(inputValue)
                    }
                }
                this.inputValue = ''
                this.$emit('input', this.dis_source.join(',')) // to update v-model
            },
            // 添加tags
            add(inputValue){
                if(inputValue !== '') {
                    this.addDisSource(inputValue)
                }
            },
            // 删除某个tags
            del(index) {
                if (!this.inputValue) {
                    this.dis_source.splice(index, 1)
                    this.$emit('input', this.dis_source.join(','))
                }
            },
            // 直接选中某一个值
            select (item) {
                this.dis_source.push(item.value)
                this.inputValue = ''
                this.$emit('input', this.dis_source.join(','))
            },
            // 监听select外的事件
            onClickOutside() {
                this.$nextTick(() => {
                    this.$refs.input.blur()
                    this.visible = false
                })
            },
            getFocus() {
                this.visible = true
                this.$emit('getFocus')
            },
            getBlur() {
                if (this.inputValue) {
                    this.addDisSource(this.inputValue)
                }
                this.visible = false
                this.$emit('getBlur')
            }
        }
    }
</script>
<style>
    .kp-tags-input .ivu-input {
        border: 0 solid #dcdee2;
        height: 28px;
        margin-top: 1px;
    }
    .kp-tags-input .ivu-input:focus {
        outline: none;
        border: none;
        box-shadow: 0 0 0 2px transparent;
    }
</style>
<style lang="less" scoped>
    .kp-tags-input {
        min-width: 180px;
        max-width: 450px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        outline: none;
        cursor: text;
        display: inline-block;
        background: #fff;
        &::after {
            content: "";
            display: block;
            height: 0;
            clear: both;
        }
        .tags-item {
            height: 28px;
            display: inline-block;
            border: 1px solid #e8eaec;
            background: #f7f7f7;
            font-size: 12px;
            vertical-align: middle;
            opacity: 1;
            overflow: hidden;
        }
        .tags {
            position: relative;
            float: left;
            height: 24px;
            line-height: 24px;
            margin: 3px 2px 0 4px;
            padding: 0 22px 0 10px;
            border-radius: 6px;
            .content {
                line-height: 24px;
            }
            .del {
                font-size: 14px;
                width: 24px;
                height: 24px;
                text-align: center;
                cursor: pointer;
                position: absolute;
                top: -1px;
                right: 0;
            }
        }
    }
    .tags-input {
        position: relative;
        float: left;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 4px;
        border-radius: 6px;
        font-size: 14px;
        background-color: inherit;
        border: none;
        color: inherit;
        width: 150px;
    }
    .kp-tags-input-box {
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        color: #515a6e;
        font-size: 14px;
        line-height: normal;
        margin-right: 5px;
        .kp-tags-input-content {
            min-width: 150px;
            max-width: 300px;
            width: inherit;
            background-color: #fff;
            box-sizing: border-box;
            border-radius: 4px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
            position: absolute;
            margin-top: 3px;
            z-index: 900;
            .kp-tags-input-dropdown {
                max-height: 200px;
                overflow: auto;
                .kp-tags-input-dropdown-list {
                    min-width: 100%;
                    list-style: none;
                    li {
                        margin: 0;
                        line-height: normal;
                        padding: 7px 16px;
                        clear: both;
                        color: #515a6e;
                        font-size: 12px !important;
                        white-space: nowrap;
                        list-style: none;
                        cursor: pointer;
                    }
                    li:hover {
                        background: #f3f3f3;
                    }
                }
            }
        }
    }
</style>
