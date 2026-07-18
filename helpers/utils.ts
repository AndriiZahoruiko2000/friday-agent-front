import { iconsList } from "@/components/custom/IconsSelector/IconsSelector";

type MyDate = string | number | Date;

export const checkDate = (date1: MyDate, date2: MyDate) => {
  const x = new Date(date1).toISOString().slice(0, 10);
  const y = new Date(date2).toISOString().slice(0, 10);

  if (x === y) {
    console.log(x);
    console.log(y);
  }
  return x === y;
};

function msToTime(duration: number) {
  if (duration <= 0) return "Зміна вже почалася";

  const totalMinutes = Math.floor(duration / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `Через ${days} дн ${hours} год`;
  if (hours > 0) return `Через ${hours} год ${minutes} хв`;
  return `Через ${Math.max(minutes, 1)} хв`;
}

export const timeToShift = (startShiftTime: string, shiftDate: Date) => {
  const nextDate = new Date(shiftDate);
  const [hours, minutes] = startShiftTime.split(":").map(Number);

  nextDate.setHours(hours || 0, minutes || 0, 0, 0);

  const currentDate = new Date();
  const diff = Number(nextDate) - Number(currentDate);

  return msToTime(diff);
};

export const getIconByValue = (icon: string) => {
  const iconItem = iconsList.find((item) => item.value === icon);
  return iconItem?.icon;
};
