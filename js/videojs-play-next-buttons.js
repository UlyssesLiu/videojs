/**
 * videojs-play-next-buttons
 * @version 1.1.0
 * @copyright 2017 Ben Clifford
 * @license Apache-2.0
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
	typeof define === 'function' && define.amd ? define(['video.js'], factory) :
	(global.videojsPlayNextButtons = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

videojs = 'default' in videojs ? videojs['default'] : videojs;

var version = "1.1.0";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');

// Default options for the plugin.
var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
var onPlayerReady = function onPlayerReady(player, options) {

  player.addClass('vjs-play-next-buttons');

  player.controlBar.playNextButton = player.controlBar.addChild('playNextButton');
  player.controlBar.el().insertBefore(player.controlBar.playNextButton.el(), player.controlBar.el().firstChild.nextSibling);

  
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function seekButtons
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var playNextButtons = function playNextButtons(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, videojs.mergeOptions(defaults, options));
  });
};

/**
 * Button to seek forward/back
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class SeekToggle
 */

var playNextButton = function (_Button) {
  _inherits(playNextButton, _Button);

  function playNextButton(player, options) {
    _classCallCheck(this, playNextButton);

    var _this2 = _possibleConstructorReturn(this, _Button.call(this, player, options));

    _this2.controlText(_this2.localize('playNext'));
   
    return _this2;
  }

  playNextButton.prototype.buildCSSClass = function buildCSSClass() {
    /* Each button will have the classes:
       `vjs-seek-button`
       `skip-forward` or `skip-back`
       `skip-n` where `n` is the number of seconds
       So you could have a generic icon for "skip back" and a more
       specific one for "skip back 30 seconds"
    */
    return 'vjs-play-next-buttons' + ' ' + _Button.prototype.buildCSSClass.call(this);
  };

   playNextButton.prototype.handleClick = function handleClick() {

      player.playlist.next();

   }
  

  return playNextButton;
}(Button);

Component.registerComponent('playNextButton', playNextButton);

// Register the plugin with video.js.
registerPlugin('playNextButtons', playNextButtons);

// Include the version number.
playNextButtons.VERSION = version;

return playNextButtons;

})));
