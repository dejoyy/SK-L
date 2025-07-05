document.addEventListener('DOMContentLoaded', () => {
  // Вставьте сюда ваш ID сервера и код пригласительной ссылки
  const guildId = "776009028861427712";
  const invite  = "https://discord.gg/24SsC7kg4M";

  const listEl  = document.querySelector("#discord-widget .dw-members-list");
  const countEl = document.querySelector("#discord-widget .dw-count");
  const joinBtn = document.querySelector("#discord-widget .dw-join-btn");

  // Обновим ссылку кнопки
  joinBtn.href = `https://discord.gg/${invite}`;

  // Берём данные из виджета
  fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
    .then(res => res.json())
    .then(data => {
      // Поменяем счётчик онлайн
      countEl.textContent = `${data.members.length} Members Online`;

      // Нарисуем список
      data.members.forEach(m => {
        const li  = document.createElement("li");
        const img = document.createElement("img");
        const span= document.createElement("span");

        img.src = m.avatar
          ? `https://cdn.discordapp.com/avatars/${m.id}/${m.avatar}.png?size=64`
          : `https://cdn.discordapp.com/embed/avatars/${parseInt(m.discriminator)%5}.png`;
        span.textContent = m.username;

        li.append(img, span);
        listEl.append(li);
      });
    })
    .catch(console.error);
});


