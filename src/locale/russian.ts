import { TranslationMessages } from "ra-core";

const RussianTranslation: TranslationMessages = {
   t: {
      notification: {
         vote: {
            eligable: "Вы не имеете права голосовать в этом опросе",
            voteExist: "Вы уже проголосовали в этом опросе",
            success: "Ваш голос успешно записан!",
            error: "Ошибка: голос не был записан - %{error}",
         },
         file: {
            size: "File size should not exceed %{requiredSize}MB, your file size - %{userFile}MB",
         },
      },
      dialog: {
         vote: {
            title: "Подтвердите голос",
            desc: "Вы уверены, что хотите проголосовать?",
         },
      },
      button: {
         back: "Назад",
         vote: "Проголосовать",
         profile: "Настройки профиля",
      },
      input: {
         photoURL: "photoURL",
         phone: "Phone number",
         basedOnPolls: "Основано на опросах",
         votes: "Голоса",
         givenAt: "Выдано",
         basedOnVotes: "Основано на голосах",
         beneficiar: "Бенефициар",
         refToDonation: "Ссылка на пожертвование",
         budget: "Бюджет",
         description: "Описание",
         isRecurring: "Регулярный платеж",
         totalPayments: "Всего платежей",
         author: "Инициатор",
         title: "Название",
         createdAt: "Дата создания",
         pollRefDescription: "Описание бюджета",
         pollReftitle: "Название плана бюджета",
         voters: "Список избирателей",
         role: "Роль",
         amount: "Сумма",
         createdBy: "Создано",
         reciept: "Квитанция",
         depositedAt: "Дата депозита",
         isVerified: "Подтверждено",
         fName: "Имя",
         lName: "Фамилия",
         email: "Электронная почта",
         status: "Статус",
         budgetPlan: "План бюджета",
         totalGrants: "Всего грантов",
         totalBenefit: "Общая сумма",
         totalVoters: "Всего избирателей",
         totalVoted: "Всего проголосовавших",
      },
      select: {
         noVoteSelected: "Голос не выбран",
         noPollSelected: "Опрос не выбран",
         noBeneficiar: "Бенефициар не выбран",
         poll: "Выберите план бюджета",
      },
      role: {
         admin: "Администратор",
         donor: "Донор",
         guest: "Гость",
      },
      status: {
         discussion: "Обсуждение",
         voting: "Голосование",
         closed: "Закрыто",
      },
      filter: {
         my: "Мои пожертвования",
         month: "Этот месяц",
         sort: "Сортировать",
         search: "Поиск",
         searchByName: "Поиск по имени",
         searchByTitle: "Поиск по названию",
      },
      login: {
         forgot: "Забыли пароль",
         signGoogle: "Войти через Google",
         register: "Регистрация",
      },
      reset: {
         title: "Сброс пароля",
         description: "Сброс пароля будет отправлен на следующий адрес электронной почты:",
         input: "Адрес электронной почты",
         cancel: "Отмена",
         send: "Отправить письмо",
         sending: "Отправка...",
         notFound: "Не найден зарегистрированный адрес электронной почты для:",
         sent: "Ссылка для сброса пароля была отправлена на ваш адрес электронной почты",
      },
      register: {
         title: "Создать новый аккаунт",
         description: "Введите электронную почту и пароль для создания аккаунта.",
         fName: "Имя",
         lName: "Фамилия",
         inputEmail: "Электронная почта",
         inputPassword: "Пароль",
         inputRepeatPassword: "Повторите пароль",
         creating: "Создание...",
         cancel: "Отмена",
         create: "Создать аккаунт",
         notification: {
            match: "Пароли не совпадают",
            valid: "Введите действительный адрес электронной почты",
            success: "Пользователь успешно создан!",
            length: "Пароль должен содержать не менее 6 символов",
            server: "Произошла ошибка на сервере. Пользователь уже существует",
         },
      },
      menu: {
         stats: "Статистика",
         nav: "Навигация",
         fundsIn: "Пожертвования",
         users: "Доноры",
         polls: "План бюджета",
         votes: "Голосование",
         fundsOut: "Расход бюджета",
         beneficiaries: "Бенефициары",
      },
      admin: {
         welcome: "Добро пожаловать",
      },
      month: {
         jan: "Янв",
         feb: "Фев",
         mar: "Мар",
         apr: "Апр",
         may: "Май",
         jun: "Июн",
         jul: "Июл",
         aug: "Авг",
         sep: "Сен",
         oct: "Окт",
         nov: "Ноя",
         dec: "Дек",
      },
      statistics: {
         title_1: "Общее",
         title_2: "Пожертвования",
         title_3: "Использование фонда",
         fields: {
            cFund: "Текущий фонд",
            tDonors: "Всего доноров",
            tDonations: "Всего пожертвований",
            tSumDonations: "Cумма пожертвований",
            tPayments: "Всего платежей",
            tSumPayments: "Cумма платежей",
         },
      },
      notifications: {
         recordVerified: "Запись проверена, редактирование невозможно",
      },
      chart: {
         pv: "Всего пожертвований",
         uv: "Текущий фонд",
         wv: "Всего платежей", // Add your custom translation for wv
      },
   },
   ra: {
      action: {
         add_filter: "Добавить фильтр",
         add: "Добавить",
         back: "Назад",
         bulk_actions: "1 выбран |||| %{smart_count} выбрано |||| %{smart_count} выбрано",
         cancel: "Отмена",
         clear_array_input: "Очистить список",
         clear_input_value: "Очистить",
         clone: "Дублировать",
         confirm: "Подтвердить",
         create: "Создать",
         create_item: "Создать %{item}",
         delete: "Удалить",
         edit: "Изменить",
         export: "Экспорт",
         list: "Список",
         refresh: "Обновить",
         remove_filter: "Убрать фильтр",
         remove_all_filters: "Убрать все фильтры",
         remove: "Удалить",
         save: "Сохранить",
         search: "Поиск",
         select_all: "Выбрать все",
         select_row: "Выбрать эту запись",
         show: "Просмотр",
         sort: "Сортировка",
         undo: "Отменить",
         unselect: "Не выбрано",
         expand: "Раскрыть",
         close: "Закрыть",
         open_menu: "Открыть меню",
         close_menu: "Закрыть меню",
         update: "Обновить",
         move_up: "Переместить вверх",
         move_down: "Переместить вниз",
         open: "Открыть",
         toggle_theme: "Переключить тему",
         select_columns: "Столбцы",
         update_application: "Обновить приложение",
         select_all_button: ""
      },
      boolean: {
         true: "Да",
         false: "Нет",
         null: " ",
      },
      page: {
         create: "Создать %{name}",
         dashboard: "Главная",
         edit: "%{name} %{recordRepresentation}",
         error: "Что-то пошло не так",
         list: "%{name}",
         loading: "Загрузка",
         not_found: "Не найдено",
         show: "%{name} %{recordRepresentation}",
         empty: "Нет %{name}.",
         invite: "Вы хотите добавить еще одну?",
         access_denied: "Доступ запрещен",
         authentication_error: "Ошибка аутентификации",
      },
      input: {
         file: {
            upload_several: "Перетащите файлы сюда или нажмите для выбора.",
            upload_single: "Перетащите файл сюда или нажмите для выбора.",
         },
         image: {
            upload_several: "Перетащите изображения сюда или нажмите для выбора.",
            upload_single: "Перетащите изображение сюда или нажмите для выбора.",
         },
         references: {
            all_missing: "Связанных данных не найдено",
            many_missing: "Некоторые из связанных данных недоступны",
            single_missing: "Связанный объект недоступен",
         },
         password: {
            toggle_visible: "Скрыть пароль",
            toggle_hidden: "Показать пароль",
         },
      },
      message: {
         about: "Справка",
         are_you_sure: "Вы уверены?",
         auth_error: "Произошла ошибка при валидации токена аутентификации",
         bulk_delete_content: "Вы уверены, что хотите удалить %{name}? |||| Вы уверены, что хотите удалить %{smart_count} объектов? |||| Вы уверены, что хотите удалить %{smart_count} объектов?",
         bulk_delete_title: "Удалить %{name} |||| Удалить %{smart_count} %{name} |||| Удалить %{smart_count} %{name}",
         bulk_update_content: "Вы уверены, что хотите обновить %{name}? |||| Вы уверены, что хотите обновить %{smart_count} объектов?",
         bulk_update_title: "Обновить %{name} |||| Обновить %{smart_count} %{name}",
         clear_array_input: "Вы уверены, что хотите очистить весь список?",
         delete_content: "Вы уверены что хотите удалить этот объект",
         delete_title: "Удалить %{name} #%{id}",
         details: "Описание",
         error: "В процессе запроса возникла ошибка, и он не может быть завершен",
         invalid_form: "Форма заполнена неверно, проверьте, пожалуйста, ошибки",
         loading: "Идет загрузка, пожалуйста, подождите...",
         no: "Нет",
         not_found: "Ошибка URL или вы следуете по неверной ссылке",
         yes: "Да",
         unsaved_changes: "Некоторые из ваших изменений не были сохранены. Вы уверены, что хотите их игнорировать?",
         access_denied: "У вас нет права доступа к этой странице",
         authentication_error: "Ошибка сервера при проверке аутентификации",
         select_all_limit_reached: ""
      },
      navigation: {
         no_results: "Результатов не найдено",
         no_filtered_results: "%{name} не найдено с текущими фильтрами",
         clear_filters: "Очистить фильтры",
         no_more_results: "Страница %{page} выходит за пределы нумерации, попробуйте предыдущую",
         page_out_of_boundaries: "Страница %{page} вне границ",
         page_out_from_end: "Невозможно переместиться дальше последней страницы",
         page_out_from_begin: "Номер страницы не может быть меньше 1",
         page_range_info: "%{offsetBegin}-%{offsetEnd} из %{total}",
         partial_page_range_info: "%{offsetBegin}-%{offsetEnd} из более %{offsetEnd}",
         current_page: "Страница %{page}",
         page: "На %{page} страницу",
         first: "На первую страницу",
         last: "На последнюю страницу",
         next: "Следующая",
         previous: "Предыдущая",
         page_rows_per_page: "Строк на странице:",
         skip_nav: "Перейти к содержанию",
      },
      sort: {
         sort_by: "Сортировать по %{field} %{order}",
         ASC: "возрастанию",
         DESC: "убыванию",
      },
      auth: {
         auth_check_error: "Пожалуйста, авторизуйтесь для продолжения работы",
         user_menu: "Профиль",
         username: "Имя пользователя",
         password: "Пароль",
         sign_in: "Войти",
         sign_in_error: "Ошибка аутентификации, попробуйте снова",
         logout: "Выйти",
      },
      notification: {
         updated: "Элемент обновлен |||| %{smart_count} обновлено |||| %{smart_count} обновлено",
         created: "Элемент создан",
         deleted: "Элемент удален |||| %{smart_count} удалено |||| %{smart_count} удалено",
         bad_item: "Элемент не валиден",
         item_doesnt_exist: "Элемент не существует",
         http_error: "Ошибка сервера",
         data_provider_error: "Ошибка dataProvider, проверьте консоль",
         i18n_error: "Не удалось загрузить перевод для указанного языка",
         canceled: "Операция отменена",
         logged_out: "Ваша сессия завершена, попробуйте переподключиться/войти снова",
         not_authorized: "У вас нет доступа к этому ресурсу",
         application_update_available: "Имеется новая версия приложения.",
      },
      validation: {
         required: "Обязательно для заполнения",
         minLength: "Минимальное кол-во символов %{min}",
         maxLength: "Максимальное кол-во символов %{max}",
         minValue: "Минимальное значение %{min}",
         maxValue: "Значение может быть %{max} или меньше",
         number: "Должно быть цифрой",
         email: "Некорректный email",
         oneOf: "Должно быть одним из: %{options}",
         regex: "Должно быть в формате (regexp): %{pattern}",
         unique: "Must be unique",
      },
      saved_queries: {
         label: "Сохраненные запросы",
         query_name: "Имя запроса",
         new_label: "Сохранить текущий запрос...",
         new_dialog_title: "Сохранить текущий запрос как",
         remove_label: "Удалить сохраненный запрос",
         remove_label_with_name: 'Удалить запрос "%{name}"',
         remove_dialog_title: "Удалить сохраненный запрос?",
         remove_message: "Вы уверены, что хотите удалить этот запрос из списка сохраненных запросов?",
         help: "Отфильтровать список и сохранить запрос на будущее",
      },
      configurable: {
         customize: "Настроить",
         configureMode: "Настроить эту страницу",
         inspector: {
            title: "Инспектор",
            content: "Наведите на UI-элементы приложения, чтобы настроить",
            reset: "Сбросить настройки",
            hideAll: "Скрыть все",
            showAll: "Показать все",
         },
         Datagrid: {
            title: "Таблица данных",
            unlabeled: "Безымянный столбец #%{column}",
         },
         SimpleForm: {
            title: "Форма",
            unlabeled: "Безымянное поле ввода #%{input}",
         },
         SimpleList: {
            title: "Список",
            primaryText: "Первичный текст",
            secondaryText: "Вторичный текст",
            tertiaryText: "Третичный текст",
         },
      },
   },
};

export default RussianTranslation;
