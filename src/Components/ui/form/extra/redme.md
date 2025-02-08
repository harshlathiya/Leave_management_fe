 //single input
 <TextInput
            field={{
              id: "name",
              name: "name",
              title: "Name",
              type:"text",
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
              value: formik.values.name,
            }}
            touched={formik.touched.name}
            error={formik.errors.name}
          /> 
          <TextInput
            field={{
              id: "email",
              name: "email",
              title: "Email",
              type: "email",
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
              value: formik.values.email,
            }}
            touched={formik.touched.email}
            error={formik.errors.email}
          />

          //loop 
          {fields.map((field) => (
            <TextInput
              key={field.id}
              field={{
                ...field,
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                value: formik.values[field.name],
              }}
              touched={formik.touched[field.name]}
              error={formik.errors[field.name]}
            />
          ))} 