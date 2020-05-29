import tingle from 'tingle.js/src/tingle.js'
import 'tingle.js/src/tingle.css'

export function modal ({
  content,
  componentProps,
  openByDefault = true,
  ...opts
}) {
  if (typeof content === 'function') {
    const componentObject = content
    content = '' // reset the content so we only place the component content

    opts.onOpen = () => {
      /* eslint-disable-next-line no-new, new-cap */
      new componentObject({
        target: document.querySelector('.tingle-modal-box__content'),
        props: componentProps,
      })
    }

    // when using a svelte component, we need to destroy the whole modal to avoid side effects
    opts.onClose = () => {
      modal.destroy()
    }
  }

  /* eslint-disable-next-line new-cap */
  const modal = new tingle.modal({ ...opts })

  modal.setContent(content)

  if (openByDefault) {
    modal.open()
  }

  // return an instance so you can control the dialog later on
  return modal
}
