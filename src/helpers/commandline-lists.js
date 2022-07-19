const commandsTimeConfig = {
    title: "Change time config...",
    list: [
        {
            id: "changeTimeConfig15",
            display: "15",
            configValue: 15,
            exec: () => {console.log("chang time 15");}
        },
        {
            id: "changeTimeConfig30",
            display: "30",
            configValue: 30,
            exec: () => {console.log("chang time 30");}
        },
        {
            id: "changeTimeConfig45",
            display: "45",
            configValue: 45,
            exec: () => {console.log("chang time 45");}
        },
        {
            id: "changeTimeConfig60",
            display: "60",
            configValue: 60,
            exec: () => {console.log("chang time 60");}
        },
        {
            id: "changeTimeConfig120",
            display: "120",
            configValue: 120,
            exec: () => {console.log("chang time 120");}
        },
    ]
}

const commandsTypeConfig = {
    title: "Change type config...",
    list: [
        {
            id: "changeTypeConfigTime",
            display: "time",
            configValue: "time",
            exec: () => {console.log("change type time");}
        },
        {
            id: "changeTypeConfigWord",
            display: "word",
            configValue: "word",
            exec: () => {console.log("change type word");}
        },
        {
            id: "changeTypeConfigCustom",
            display: "custom",
            configValue: "custom",
            exec: () => {console.log("change type custom");}
        },
    ]
}

export const defalutCommands = {
    title: "",
    list: [
        {
            id: "changeTimeConfig",
            display: "Time...",
            subgroup: commandsTimeConfig,
        },
        {
            id: "changeTypeConfig",
            display: "Type...",
            subgroup: commandsTypeConfig,
        },
        {
            id: "changeThemeConfig",
            display: "Theme...",
            subgroup: commandsTypeConfig,
        },
    ]
}

export let currentCommands = defalutCommands;
export function setCurrentCommands(commands) {
    currentCommands = commands;
}