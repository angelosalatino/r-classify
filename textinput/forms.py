from django import forms

class abstractForm(forms.Form):
    abstract_text = forms.CharField(widget=forms.Textarea(attrs={"label":"Abstract<span class='req'>*</span>", "rows":10, "cols":50, "id":'text_input'}))

class pdfForm(forms.Form):
    pdf_paper = forms.FileField(widget=forms.FileInput(attrs={'accept':'.pdf'}))

class pdftextform(forms.Form):
    pdf_text = forms.CharField(widget=forms.Textarea(attrs={"label":"Abstract<span class='req'>*</span>", "rows":10, "cols":50, "id":'pdftext'}))
    pdf_text_title = forms.CharField(widget=forms.Textarea(attrs={"label":"Abstract<span class='req'>*</span>", "rows":3, "cols":50, "id":'pdf_title'}))
    pdf_text_keywords = forms.CharField(widget=forms.Textarea(attrs={"label":"Abstract<span class='req'>*</span>", "rows":3, "cols":50, "id":'pdf_keywords'}))


