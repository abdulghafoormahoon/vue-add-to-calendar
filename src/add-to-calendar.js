import AddToCalendarMixin from './add-to-calendar-mixin';

export const calendars = {
  google: {
    url: 'http://www.google.com/calendar/event?action=TEMPLATE&trp=false',
    parameters (title, location, details, start, end) {
      let parameters = {
        text: title,
        location: location,
        details: details,
      };

      if (start && end) {
        parameters.dates = `${start}/${end}`;
      }

      return parameters;
    }
  },

  microsoft: {
    url: 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent',
    parameters (title, location, details, start, end) {
      return {
        summary: title,
        location: location,
        details: details,
        dtstart: start,
        dtend: end,
      };
    }
  }
};

export default {
  props: {
    /**
     * Event title.
     * @var string
     */
    title: {
      type: String,
      default: ''
    },

    /**
     * Event location.
     * @var string
     */
    location: {
      type: String,
      default: ''
    },

    /**
     * Event details.
     * @var string
     */
    details: {
      type: String,
      default: ''
    },

    /**
     * Event start.
     * @var date
     */
    start: {
      type: Date,
      default: null
    },

    /**
     * Event end.
     * @var date
     */
    end: {
      type: Date,
      default: null
    },
  },

  data () {
    return {
      /**
       * Available calendars.
       * @param object
       */
      calendars
    };
  },

  methods: {
    /**
     * Returns generated calendar url.
     *
     * @param calendar.
     */
    calendarUrl (calendar) {
      let url = this.calendars[calendar].url;
      let parameters = this.calendars[calendar].parameters(
        this.title,
        this.location,
        this.details,
        this.formattedDate(this.start),
        this.formattedDate(this.end)
      );

      for (let key in parameters) {
        if (parameters.hasOwnProperty(key) && parameters[key]) {
          url += `&${key}=${parameters[key]}`;
        }
      }

      return url;
    },

    formattedDate (date) {
      return date ? date.toISOString().replace(/-|:|\.\d+/g, '') : null;
    }
  },

  mounted () {
    //
  },

  /**
   * Set component aliases for buttons and links.
   */
  components: {
    'google-calendar': {
      mixins: [AddToCalendarMixin],
      data: function () { return { calendar: 'google' }; }
    },
    'microsoft-calendar': {
      mixins: [AddToCalendarMixin],
      data: function () { return { calendar: 'microsoft' }; }
    }
  }
};