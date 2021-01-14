import FormLabel from '../FormLabel/FormLabel';
import InlineError from './InlineError';
import React from 'react';
import classNames from 'classnames';
import { uniqueId } from 'lodash';

interface FieldContainerProps {
  /**
   * Additional classes to be added to the field container.
   */
  className?: string;
  /**
   * The HTML element used to render the container
   */
  component: 'div' | 'fieldset';
  /**
   * A unique ID to be used for the error message. If one isn't provided, a unique ID will be generated.
   */
  errorId?: string,
  errorMessage?: React.ReactNode;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement: 'top' | 'bottom';
  /**
   * Used to focus the field input on `componentDidMount()`
   */
  focusTrigger?: boolean;
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * A unique ID to be used for the field input. If one isn't provided, a unique ID will be generated.
   */
  id?: string;
  /**
   * Access a reference to the field input
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * Label for the field.
   */
  label: React.ReactNode;
  /**
   * Additional classes to be added to the field label
   */
  labelClassName?: string;
  /**
   * The root HTML element used to render the field label
   */
  labelComponent: 'label' | 'legend';
  /**
   * A unique `id` to be used on the field label. If one isn't provided, a unique ID will be generated.
   */
  labelId?: string;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * A function that returns a field input element to accept render props
   */
  render: (...args: any[]) => any;
}

export class FieldContainer extends React.Component<FieldContainerProps> {
  static defaultProps = {
    errorPlacement: 'top'
  }
  
  constructor(props: FieldContainerProps) {
    super(props);

    this.id = props.id || uniqueId('field_');
    this.labelId = props.labelId || `${this.id}-label`;
    this.errorId = props.errorId || `${this.id}-error`;
    this.setFieldRef = this.setFieldRef.bind(this);
  }

  id: string;
  labelId: string;
  errorId: string;
  focusRef?: HTMLDivElement;

  setFieldRef(elem: HTMLDivElement): void {
    // Use React.forwardRef when upgraded to React 16.3
    if (this.props.focusTrigger) {
      this.focusRef = elem;
    }
    if (this.props.inputRef) {
      this.props.inputRef(elem);
    }
  }

  render(): React.ReactNode {
    const {
      className,
      component,
      errorMessage,
      errorPlacement,
      hint,
      inversed,
      label,
      labelClassName,
      labelComponent,
      requirementLabel,
      render,
    } = this.props;

    const ComponentType = component;
    const isFieldset = ComponentType === 'fieldset'
    const classes = classNames({
      'ds-c-fieldset': isFieldset
    }, className);
    const bottomError = errorPlacement === 'bottom' && errorMessage;

    // Field input props handled by <FieldContainer>
    const fieldInputProps = { 
      id: this.id,
      labelId: this.labelId,
      errorId: this.errorId,
      setRef: this.setFieldRef,
    };

    const renderBottomError = () => {
      return (bottomError) ? (
        <InlineError id={this.errorId} inversed={inversed}>
          {errorMessage}
        </InlineError>
      ) : null;
    }

    return (
      <ComponentType className={classes} >
        <FormLabel
          className={labelClassName}
          component={labelComponent}
          errorMessage={errorPlacement === 'top' ? errorMessage : null}
          errorId={this.errorId}
          // Avoid using `for` attribute for components with multiple inputs 
          // i.e. ChoiceList, DateField, and other components that use `fieldset`
          fieldId={isFieldset ? this.id : null}
          hint={hint}
          id={this.labelId}
          requirementLabel={requirementLabel}
          inversed={inversed}
        >
          {label}
        </FormLabel>
        {render(fieldInputProps)}
        {renderBottomError()}
      </ComponentType>
    );
  }
}

export const FieldContainerPropKeys = [
  'className',
  'component',
  'errorMessage',
  'errorPlacement',
  'focusTrigger',
  'hint',
  'id',
  'inputRef',
  'inversed',
  'label',
  'labelClassName',
  'labelComponent',
  'labelId',
  'requirementLabel',
  'render',
];

export default FieldContainer;
