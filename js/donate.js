const slider    = document.getElementById('myRange');
const tooltip   = document.getElementById('tooltip');
const dispValue = document.getElementById('displayValue');
const dispBonus = document.getElementById('displayBonus');

function updateTooltip() {
  const min   = +slider.min;
  const max   = +slider.max;
  const val   = +slider.value;
  const pct   = (val - min) / (max - min) * 100;
  const bonus = Math.round((val - min) / (max - min) * 1000);

  // тултип
  tooltip.style.left    = pct + '%';
  tooltip.textContent   = `${val}, +${bonus} Coin of Luck`;

  // поля над ползунком
  dispBonus.textContent = `+${bonus} Coin of Luck`;
}

// Слушатель для ползунка
slider.addEventListener('input', () => {
  // при движении синхронизируем только ползунок → бонус, тултип
  updateTooltip();
  // подхватываем новое значение ползунка в поле
  dispValue.value = slider.value;
});

// **Новый** слушатель для текстового поля
dispValue.addEventListener('input', () => {
  // 1) Оставляем в нём только цифры
  dispValue.value = dispValue.value.replace(/\D/g, '');

  // 2) Если пусто — не трогаем ползунок
  if (dispValue.value === '') return;

  const raw = parseInt(dispValue.value, 10);
  // 3) Для ползунка — clamp до max
  slider.value = Math.min(raw, +slider.max);

  // 4) Обновляем тултип и бонус
  updateTooltip();
});

// Инициализация при загрузке страницы
// отображает 3 / +0
updateTooltip();
