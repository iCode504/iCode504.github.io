"use strict";

const getEleTop = (ele) => {
    let actualTop = ele.offsetTop
    let current = ele.offsetParent
    while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }
    return actualTop
}

/* <---- Tabs Begin ----> */
// 初始化选项卡
const initializeTabs = () => {
    document.querySelectorAll('.tabs').forEach(tabs => {
        addTabClickEventListeners(tabs);
    });
}

// 为选项卡添加点击事件监听器
const addTabClickEventListeners = (tabs) => {
    tabs.querySelectorAll('.nav-tabs .tab').forEach(tab => {
        tab.addEventListener('click', (event) => handleTabClick(event));
    });
}

// 初始化回到顶部按钮
const initializeScrollToTopButtons = () => {
    document.querySelectorAll('.tabs .tab-to-top button').forEach(button => {
        button.addEventListener('click', (event) => handleScrollToTop(event));
    });
}

const handleTabClick = (event) => {
    event.preventDefault();
    const clickedTab = event.currentTarget;

    // 找到当前选项卡组
    const targetId = clickedTab.dataset.target;
    const tabsContainerId = targetId.split('-')[0];

    const tabsContainer = document.querySelector(`#${tabsContainerId}`);
    if (!tabsContainer) return;

    // 处理 nav-tabs 部分
    tabsContainer.querySelectorAll('.nav-tabs .tab').forEach(tab => {
        if (tab.dataset.target.split('-')[0] === tabsContainerId) {
            tab.classList.toggle('active', tab === clickedTab);
        }
    });

    // 处理 tab-contents 部分
    if (targetId) {
        const contentToShow = tabsContainer.querySelector(`#${targetId}`);
        if (contentToShow) {
            tabsContainer.querySelectorAll('.tab-contents .tab-item-content').forEach(content => {
                if (content.id.split('-')[0] === tabsContainerId) {
                    content.classList.toggle('active', content === contentToShow);
                }
            });
        }
    }
}

const handleScrollToTop = (event) => {
    event.stopPropagation(); // 阻止事件冒泡

    // 找到当前按钮所在的选项卡组
    const tabGroup = event.currentTarget.closest('.tabs');
    window.scrollTo({ top: getEleTop(tabGroup) - 70, behavior: 'smooth' });
}

const tabsFn = () => {
    initializeTabs();
    initializeScrollToTopButtons();
}
/* <---- Tabs End ----> */

function tagsFn() {
    tabsFn();
}

document.addEventListener('DOMContentLoaded', () => {
    tagsFn();
});

